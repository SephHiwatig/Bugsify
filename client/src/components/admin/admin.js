import React, { useState } from 'react';
import styled from 'styled-components';
import TextEditor from './textEditor';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import IconInput from '../extras/iconinput';
import {
    BsArrowLeftRight,
    BsFillTrashFill,
    BsCardHeading,
    BsFillStarFill,
    BsFileEarmarkPlus,
    BsPencil,
    BsSearch
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

const AdminPanel = () => {
    // Component states
    const [kata, setKata] = useState({
        _id: null,
        difficulty: "",
        description: "",
        tests: [["", ""], ["", ""], ["", ""]],
        isSampleKata: false,
        title: "",
        solutionTemplate: "",
        editorState: EditorState.createEmpty()
    });


    // Component functions
    function createTestInput(showButton, index) {
        return <Tests key={index}>
            <IconInput type="text" placeholder="Input" value={kata.tests[index][0]} change={(e) => {
                const newTests = kata.tests.map((items, innerIndex) => {
                    if (innerIndex == index) {
                        return [e.target.value, items[1]];
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
                        return [items[0], e.target.value];
                    }
                    return [...items];
                })
                setKata(current => ({
                    ...current,
                    tests: newTests
                }))
            }}><BsArrowLeftRight /></IconInput>
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

    function addKata() {
        console.log(kata);
        console.log(stateToHTML(kata.editorState.getCurrentContent()))
    }

    function editKata() {
        setKata({
            _id: null,
            difficulty: "Hard",
            description: "Sample descript",
            tests: [[1, 2], [3, 4], [5, 6], [1, 2], [3, 4], [5, 6]],
            isSampleKata: true,
            title: "Sample title",
            solutionTemplate: "function solve() {}",
            editorState: EditorState.createEmpty()
        })
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
                    <DropDown options={["Easy", "Normal", "Hard"]} value={kata.difficulty}
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
                        <tr>
                            <td className="table-col">Easy</td>
                            <td className="table-col">Pig latin</td>
                            <td>
                                <InfoButton type="button" click={editKata}><BsPencil /></InfoButton>
                                <WarningButton type="button"><BsFillTrashFill /></WarningButton>
                            </td>
                        </tr>
                        <tr>
                            <td className="table-col">Easy</td>
                            <td className="table-col">Pig latin</td>
                            <td>
                                <InfoButton type="button"><BsPencil /></InfoButton>
                                <WarningButton type="button"><BsFillTrashFill /></WarningButton>
                            </td>
                        </tr>
                        <tr>
                            <td className="table-col">Easy</td>
                            <td className="table-col">Pig latin</td>
                            <td>
                                <InfoButton type="button"><BsPencil /></InfoButton>
                                <WarningButton type="button"><BsFillTrashFill /></WarningButton>
                            </td>
                        </tr>
                        <tr>
                            <td className="table-col">Easy</td>
                            <td className="table-col">Pig latin</td>
                            <td>
                                <InfoButton type="button"><BsPencil /></InfoButton>
                                <WarningButton type="button"><BsFillTrashFill /></WarningButton>
                            </td>
                        </tr>
                    </tbody>
                </KataTable>
            </TableWrapper>
            <PagingWrapper>
                <Paginator />
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
    margin-bottom: 8px;

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

    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
        border-bottom: none;
        padding-bottom: 0;
    }

    & div {
        margin-bottom: 4px;
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
    flex: 1;
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

export default AdminPanel;