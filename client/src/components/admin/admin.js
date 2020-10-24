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
    BsFillExclamationTriangleFill
} from "react-icons/bs";
import Button from '../extras/button';
import SecondaryButton from '../extras/secondaryButton';
import DropDown from '../extras/dropdown';
import TextArea from '../extras/textArea';
import CheckBox from '../extras/checkbox';
import ButtonWrapper from '../extras/buttonWrapper';
import InfoButton from '../extras/infoButton';
import WarningButton from '../extras/warningButton';
import Paginator from './paginator';
import { produce } from 'immer';
import { baseApi } from '../../environment';
import { useSelector } from "react-redux";
import {convertFromRaw, convertToRaw} from 'draft-js';

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
        editorState: EditorState.createEmpty()
    });
    const [formInvalid, setFormInvalid] = useState(false);
    const [kataList, setKataList] = useState([]);
    const [pagingInfo, setPagingInfo] = useState({
        pageNumber: 1,
        pageSize: 10,
        totalCount: 1
    });


    // Form functions
    function createTestInput(showButton, index) {
        return <Tests key={index}>
            <IconInput type="text" placeholder="Input" value={kata.tests[index][0]} change={(e) => {
                const newTests = kata.tests.map((items, innerIndex) => {
                    if (innerIndex == index) {
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
                    if (innerIndex == index) {
                        return [items[0], e.target.value, items[2]];
                    }
                    return [...items];
                })
                setKata(current => ({
                    ...current,
                    tests: newTests
                }))
            }}><BsArrowLeftRight /></IconInput>
            <DropDown options={["string", "number", "boolean"]} value={kata.tests[index][2]} placeholder="Type"
                select={(e) => {
                    const newTests = kata.tests.map((items, innerIndex) => {
                        if (innerIndex == index) {
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
            tests: current.tests.filter(item => current.tests.indexOf(item) != index)
        }))
    }

    async function addKata() {
        // Convert editorstate to raw before storing to db
        const newKata = produce(kata, draftState => {
            draftState.editorState = convertToRaw(kata.editorState.getCurrentContent());
        })

        // Validate that all fields are filled
        const stateKeys = Object.keys(newKata);
        let testError = false;
        let editorError = true;
        let generalError = false;

        stateKeys.forEach(key => {
            if(key === "tests") {
                newKata[key].forEach(testInfo => {
                    if(!testInfo[2]) testError = true;
                    // testInfo.forEach( (info, index) => {
                    //     if(index !== 0)
                    //         if(!info) testError = true;
                    // })
                })
            } else if (key === "editorState") {
                newKata[key].blocks.forEach(block => {
                    if(block.text !== "")
                        editorError = false;
                })
            } else {

                if(!newKata[key] && key !== "_id" && key != "isSampleKata")
                    generalError = true;
            }
        });

        if(testError || editorError || generalError) {
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
                const res = await data.json();
            }
        }
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

    // Table functions
    async function getPagedKatas(pageSize = 10, pageNumber = 1) {
        const data = await fetch(
            baseApi + 'admin/katas?pageSize=' + pageSize + '&pageNumber=' + pageNumber,
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

    function editKata(k) {

        setKata(produce(kata, draftState => {
            draftState._id = k._id;
            draftState.difficulty = k.difficulty;
            draftState.description = k.description;
            draftState.tests = k.tests;
            draftState.isSampleKata = k.isSampleKata;
            draftState.title = k.title;
            draftState.solutionTemplate = k.solutionTemplate;
            draftState.editorState = EditorState.createWithContent(convertFromRaw(k.editorState))
        }));


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
            <FormFooter>
                <ButtonWrapper type="button" title="Add Problem" click={addKata}><BsFileEarmarkPlus /> </ButtonWrapper>
            </FormFooter>
        </LeftWrapper>
        <RightWrapper>
            <TableWrapper>
                <KataTable>
                    <thead>
                        <tr>
                            <th className="table-col">Difficulty</th>
                            <th className="table-col">Title</th>
                            <th className="table-col">
                                <IconInput type="text" placeholder="Search"><BsSearch /></IconInput>
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
                                    <WarningButton type="button"><BsFillTrashFill /></WarningButton>
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

const FormFooter = styled.div`
margin-top: 8px;
    justify-content: center;
    border: 1px solid #007300;
    padding: 4px;
    border-radius: 4px;
    text-align: center;
    color: #007300;

    &:hover {
        background-color: #007300;
        color: #000;
        transition: background-color .3s ease-in-out;
    }

    &:active {
        transform: scale(0.9);
        transition: transform .2s ease-in-out
    }
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