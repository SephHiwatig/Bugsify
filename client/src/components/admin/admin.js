import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TextEditor from './textEditor';
import { EditorState } from 'draft-js';
import IconInput from '../extras/iconinput';
import {
    BsArrowLeftRight,
    BsFillTrashFill,
    BsCardHeading,
    BsFillStarFill,
    BsFileEarmarkPlus,
    BsPencil,
    BsSearch,
    BsFonts,
    BsFillExclamationTriangleFill,
    BsPencilSquare,
    BsArrow90DegLeft,
    BsToggleOff,
    BsToggleOn
} from "react-icons/bs";
import Button from '../extras/button';
import SecondaryButton from '../extras/secondaryButton';
import DropDown from '../extras/dropdown';
import TextArea from '../extras/textArea';
import CheckBox from '../extras/checkbox';
import ButtonWrapper from '../extras/buttonWrapper';
import InfoButton from '../extras/infoButton';
import SuccessButton from '../extras/successButton';
import WarningButton from '../extras/warningButton';
import Paginator from './paginator';
import { produce } from 'immer';
import { baseApi } from '../../environment';
import { useSelector } from "react-redux";
import {convertFromRaw, convertToRaw} from 'draft-js';
import { throttle } from 'lodash';
import ConfirmDialog from '../extras/confirmDialog';

const AdminPanel = () => {
    const accessToken = useSelector(state => state.auth.accessToken);
    // Component states
    const [kata, setKata] = useState({
        _id: null,
        difficulty: "",
        description: "",
        tests: [["", "", ""], ["", "", ""], ["", "", ""]],
        isSampleKata: false,
        title: "",
        solutionTemplate: "",
        editorState: EditorState.createEmpty(),
        enabled: true
    });
    const [formInvalid, setFormInvalid] = useState(false);
    const [kataList, setKataList] = useState([]);
    const PAGE_SIZE = 10;
    const [pagingInfo, setPagingInfo] = useState({
        pageNumber: 1,
        pageSize: PAGE_SIZE,
        totalCount: 1,
        filterState: ""
    });
    const [editMode, setEditMode] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [kataToDisable, setKataToDisable] = useState({
        _id: "",
        title: "",
        enabled: true
    });


    // Form functions
    function createTestInput(showButton, index) {
        return <Tests key={index}>
            <IconInput type="text" placeholder="Input" value={kata.tests[index][0]} change={(e) => {
                const newTests = kata.tests.map((items, innerIndex) => {
                    if (innerIndex === index) {
                        return [e.target.value, items[1], items[2]];
                    }
                    return [...items];
                })
                setKata(current => ({
                    ...current,
                    tests: newTests
                }))
            }}><BsArrowLeftRight /></IconInput>
            <IconInput type="text" placeholder="Output" value={kata.tests[index][1]} change={(e) => {
                const newTests = kata.tests.map((items, innerIndex) => {
                    if (innerIndex === index) {
                        return [items[0], e.target.value, items[2]];
                    }
                    return [...items];
                })
                setKata(current => ({
                    ...current,
                    tests: newTests
                }))
            }}><BsArrowLeftRight /></IconInput>
            <DropDown options={["string", "number", "boolean"]} value={kata.tests[index][2]} placeholder="Output Type"
                select={(e) => {
                    const newTests = kata.tests.map((items, innerIndex) => {
                        if (innerIndex === index) {
                            return [items[0], items[1], e];
                        }
                        return [...items];
                    })
                    setKata(current => ({
                        ...current,
                        tests: newTests
                    }))
                }}><BsFonts />
            </DropDown>
            {showButton && <Button type="button" click={deleteTest.bind(null, index)}><BsFillTrashFill /></Button>}
            {!showButton && <div style={{ visibility: "hidden" }}><Button type="button"><BsFillTrashFill /></Button></div>}
        </Tests>;
    }

    function addTestInput() {
        setKata(current => ({
            ...current,
            tests: [...current.tests, ["", ""]]
        }))
    }

    function deleteTest(index) {
        setKata(current => ({
            ...current,
            tests: current.tests.filter(item => current.tests.indexOf(item) !== index)
        }))
    }

    async function addKata() {
        // Convert editorstate to raw before storing to db
        const newKata = produce(kata, draftState => {
            draftState.editorState = convertToRaw(kata.editorState.getCurrentContent());
        })

        if(_validateForm(newKata)) {
            setFormInvalid(true);
        } 
        else {
            setFormInvalid(false);
            const data = await fetch(
            baseApi + "admin/add-kata",
            {
                method: "POST",
                body: JSON.stringify(newKata),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                }
            }
            );

            if(data.ok) {
                setKata({
                    _id: null,
                    difficulty: "",
                    description: "",
                    tests: [["", "", ""], ["", "", ""], ["", "", ""]],
                    isSampleKata: false,
                    title: "",
                    solutionTemplate: "",
                    editorState: EditorState.createEmpty(),
                    enabled: true
                });

                // TODO: Push newly added kata to the list
            }
        }
    }

    async function updateKata() {
        // Convert editorstate to raw before storing to db
        const newKata = produce(kata, draftState => {
            draftState.editorState = convertToRaw(kata.editorState.getCurrentContent());
        })

        if(_validateForm(newKata)) {
            setFormInvalid(true);
        } else {
            setFormInvalid(false);
            const data = await fetch(
                baseApi + "admin/update",
                {
                    method: "PUT",
                    body: JSON.stringify(newKata),
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + accessToken
                    }
                }
            );

            if(data.ok) {
                const index = kataList.findIndex(item => item._id === newKata._id);
                const newList = produce(kataList, draftState => {
                    draftState[index] = newKata;
                })

                setKataList(newList);
                setKata({
                    _id: null,
                    difficulty: "",
                    description: "",
                    tests: [["", "", ""], ["", "", ""], ["", "", ""]],
                    isSampleKata: false,
                    title: "",
                    solutionTemplate: "",
                    editorState: EditorState.createEmpty(),
                    enabled: true
                });
                setEditMode(false);
            }
        }
    }

    function _validateForm(tempKata) {
        // Validate that all fields are filled
        const stateKeys = Object.keys(tempKata);
        let testError = false;
        let editorError = true;
        let generalError = false;
    
        stateKeys.forEach(key => {
            if(key === "tests") {
                tempKata[key].forEach(testInfo => {
                    if(!testInfo[2]) testError = true;
                })
            } else if (key === "editorState") {
                tempKata[key].blocks.forEach(block => {
                    if(block.text !== "")
                        editorError = false;
                })
            } else {
    
                if(!tempKata[key] && key !== "_id" && key !== "isSampleKata")
                    generalError = true;
            }
        });

        return testError || editorError || generalError;
    }

    function updateKataState(eventValue, state, field, setter) {
        const newState = { ...state };
        newState[field] = eventValue;
        setter(newState);
    }

    function updateDropdown(option) {
        const newState = { ...kata };
        newState["difficulty"] = option;
        setKata(newState);
    }

    function cancelEditMode() {
        setKata({
            _id: null,
            difficulty: "",
            description: "",
            tests: [["", "", ""], ["", "", ""], ["", "", ""]],
            isSampleKata: false,
            title: "",
            solutionTemplate: "",
            editorState: EditorState.createEmpty(),
            enabled: true
        });
        setEditMode(false);
    }

    // Table functions
    async function getPagedKatas(pageSize = PAGE_SIZE, pageNumber = 1, filterState = "") {
        const data = await fetch(
            baseApi + 'admin/katas?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&filterState=' + filterState,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                }
            }
        )

        if(data.ok) {
            const response = await data.json();
            setKataList(response.katas);
            setPagingInfo(response.pagingInfo);
        }
    }

    const searchKatas = async (key) => {
        const data = await fetch(
            baseApi + 'admin/search?key=' + key + '&pageSize=' + PAGE_SIZE,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                }
            }
        )

        if(data.ok) {
            const response = await data.json();
            setKataList(response.katas);
            setPagingInfo({
                pageNumber: 1,
                pageSize: PAGE_SIZE,
                totalCount: response.totalCount,
                filterState: key
            });
        }
    }

    const throttledSearchKatas = throttle(searchKatas, 500);

    function editKata(k) {

        setKata(produce(kata, draftState => {
            draftState._id = k._id;
            draftState.difficulty = k.difficulty;
            draftState.description = k.description;
            draftState.tests = k.tests;
            draftState.isSampleKata = k.isSampleKata;
            draftState.title = k.title;
            draftState.solutionTemplate = k.solutionTemplate;
            draftState.editorState = EditorState.createWithContent(convertFromRaw(k.editorState));
            draftState.enabled = k.enabled;
        }));
        setEditMode(true);
        setFormInvalid(false);
    }

    function cancelDisableKata() {
        setKataToDisable({
            _id: "",
            title: "",
            enabled: true
        })
        setOpenDialog(false);
    }

    async function toggleKata() {
        const data = await fetch(
            baseApi + 'admin/toggle-kata',
            {
                method: "PUT",
                body: JSON.stringify({ _id: kataToDisable._id, enabled: kataToDisable.enabled }),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                }
            }
        )

        if(data.ok) {
            const index = kataList.findIndex(item => item._id === kataToDisable._id);
            const newList = produce(kataList, draftState => {
                draftState[index].enabled = !draftState[index].enabled;
            })

            setKataList(newList);
            setKataToDisable({
                _id: "",
                title: "",
                enabled: true
            })
            setOpenDialog(false);
        }
    }

    useEffect(() => {
        getPagedKatas();
    }, []);

    return <Wrapper>
        <LeftWrapper>
            <TextEditor change={setKata} kata={kata} trigger={kata.editorState} editorState={kata.editorState}/>
            <FormWrapper>
                <TestWrapper>
                    <IconInput type="text" placeholder="Title" value={kata.title}
                        change={(event) => {
                            updateKataState(event.target.value, kata, "title", setKata)
                        }}><BsCardHeading />
                    </IconInput>
                </TestWrapper>
                <TestWrapper>
                    <DropDown options={["Easy", "Normal", "Hard"]} value={kata.difficulty} placeholder="Difficulty"
                        select={updateDropdown}><BsFillStarFill />
                    </DropDown>
                </TestWrapper>
                <TestWrapper>
                    <TextArea placeholder="Starting template" rows={5} value={kata.solutionTemplate}
                        change={(event) => {
                            updateKataState(event.target.value, kata, "solutionTemplate", setKata)
                        }}><BsCardHeading /></TextArea>
                </TestWrapper>
                <TestWrapper>
                    <CheckBox id="sample" change={(event) => {
                        updateKataState(event.target.checked, kata, "isSampleKata", setKata)
                    }} checked={kata.isSampleKata}>
                        <span>Sample Question</span>
                    </CheckBox>
                </TestWrapper>
                <TestWrapper>
                    <h3>Tests</h3>
                    {kata.tests.map((values, index) => {
                        return createTestInput(index > 2, index);
                    })}
                </TestWrapper>
                <SecondaryButton type="button" click={addTestInput} title="Add Test"></SecondaryButton>
                {formInvalid && <TestWrapper>
                    <Warning><BsFillExclamationTriangleFill />&nbsp;All fields are required.</Warning>
                </TestWrapper>}
            </FormWrapper>
            {!editMode && <FormFooterAdd>
                <ButtonWrapper type="button" title="Add Kata" click={addKata}><BsFileEarmarkPlus /> </ButtonWrapper>
            </FormFooterAdd>}
            {editMode && <FooterWrapper>
                <FormFooterCancel>
                    <ButtonWrapper type="button" title="Cancel" click={cancelEditMode}><BsArrow90DegLeft /> </ButtonWrapper>
                </FormFooterCancel>
                <FormFooterEdit>
                    <ButtonWrapper type="button" title="Update Kata" click={updateKata}><BsPencilSquare /> </ButtonWrapper>
                </FormFooterEdit>
            </FooterWrapper>}
        </LeftWrapper>
        <RightWrapper>
            <TableWrapper>
                <KataTable>
                    <thead>
                        <tr>
                            <th className="table-col">Difficulty</th>
                            <th className="table-col">Title</th>
                            <th className="table-col">
                                <IconInput type="text" placeholder="Search" change={(event => {
                                    const value = event.target.value;
                                    throttledSearchKatas(value);
                                })}><BsSearch /></IconInput>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {kataList.map(k => {
                            return <tr key={k._id}>
                                <td className="table-col">{k.difficulty}</td>
                                <td className="table-col">{k.title}</td>
                                <td>
                                    <InfoButton type="button" click={editKata.bind(null, k)}><BsPencil /></InfoButton>
                                    {!k.enabled && <WarningButton type="button" click={() => { 
                                        setOpenDialog(true);
                                        setKataToDisable({ _id: k._id, title: k.title, enabled: k.enabled });
                                    }}><BsToggleOff /></WarningButton>}
                                    {k.enabled && <SuccessButton type="button" click={() => {
                                        setOpenDialog(true);
                                        setKataToDisable({ _id: k._id, title: k.title, enabled: k.enabled });
                                    }}><BsToggleOn /></SuccessButton>}
                                </td>
                            </tr>
                        })}
                    </tbody>
                </KataTable>
            </TableWrapper>
            <PagingWrapper>
                <Paginator paging={pagingInfo} onpage={getPagedKatas}/>
            </PagingWrapper>
        </RightWrapper>
        {openDialog && <ConfirmDialog status={kataToDisable.enabled} title={kataToDisable.title} cancel={cancelDisableKata} ok={toggleKata}/> }
    </Wrapper>;
}

// Component styles
const Wrapper = styled.div`
    padding: 16px;
    min-height: 83%;
    display: flex;
    flex-direction: column-reverse;

    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

const LeftWrapper = styled.div`
    padding: 8px;
    margin: 2px;
    min-height: 100%;
    flex: 1;
    background-color: var(--secondary-color);
    display: flex;
    flex-direction: column;
`

const RightWrapper = styled.div`
    padding: 8px;
    margin: 2px;
    min-height: 100%;
    flex: 1;
    background-color: var(--secondary-color);
    display: flex;
    flex-direction: column;
`

const FormWrapper = styled.div`
    flex: 1;
    margin-top: 8px;
`;

const TestWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 4px 0;

    & h3 {
        margin: 0 0 8px 0;
    }
`;

const Tests = styled.div`
    display: flex;
    margin-bottom: 4px;
    flex-direction: column;
    border-bottom: 1px solid #aaa;
    padding-bottom: 8px;
    justify-content: space-between;

    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
        border-bottom: none;
        padding-bottom: 0;
    }

    & div {
        margin: 0 2px 4px 2px;
    }
`;

const FormFooterAdd = styled.div`
    margin-top: 8px;
    justify-content: center;
    border: 1px solid #007300;
    padding: 4px;
    border-radius: 4px;
    text-align: center;
    color: #007300;

    &:hover {
        background-color: #007300;
        color: var(--main-font-color);
        transition: background-color .3s ease-in-out;
    }

    &:active {
        transform: scale(0.9);
        transition: transform .2s ease-in-out
    }
`;

const FormFooterEdit = styled.div`
    margin: 8px 0 0 4px;
    justify-content: center;
    border: 1px solid #007300;
    padding: 4px;
    border-radius: 4px;
    text-align: center;
    color: #007300;
    min-width: 120px;

    &:hover {
        background-color: #007300;
        color: var(--main-font-color);
        transition: background-color .3s ease-in-out;
    }

    &:active {
        transform: scale(0.9);
        transition: transform .2s ease-in-out
    }
`;

const FormFooterCancel = styled.div`
        margin: 8px 4px 0 0;
        justify-content: center;
        border: 1px solid var(--ui-theme-color);
        padding: 4px;
        border-radius: 4px;
        text-align: center;
        color: var(--ui-theme-color);
        min-width: 120px;

        &:hover {
            background-color: var(--ui-theme-color);
            color: var(--main-font-color);
            transition: background-color .3s ease-in-out;
        }

        &:active {
            transform: scale(0.9);
            transition: transform .2s ease-in-out
        }
`;

const FooterWrapper = styled.div`
        display: flex;
        justify-content: center;
`;

const TableWrapper = styled.div`
    margin: 8px 0;
`;

const KataTable = styled.table`
    width: 100%;
    text-align: center;
    border-collapse:collapse;

    & th.table-col {
        background-color: var(--ui-theme-color);
    }

    & tr:nth-child(even) {
        background-color: #adb5bd;
        color: #000;
    }

    & td,th {
        padding: 4px;
    }
`;

const PagingWrapper = styled.div`
    
`;

const Warning = styled.div`
    border: 3px solid #fcca03;
    background-color: #f9fc3a;
    color: #000;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    word-wrap: break-word;
    max-width: 100%;
`;

export default AdminPanel;