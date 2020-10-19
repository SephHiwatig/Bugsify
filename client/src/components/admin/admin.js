import React, { useState } from 'react';
import styled from 'styled-components';
import TextEditor from './textEditor';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import IconInput from '../extras/iconinput';
import { BsArrowLeftRight, BsFillTrashFill, BsCardHeading, BsFillStarFill } from "react-icons/bs";
import Button from '../extras/button';
import SecondaryButton from '../extras/secondaryButton';
import DropDown from '../extras/dropdown';
import TextArea from '../extras/textArea';

const AdminPanel = () => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(),
    );
    const [dropDownValue, setDropdownValue] = useState("");
    const [test, setTest] = useState("");

    const [tests, setTests] = useState([createTestInput(0), createTestInput(1), createTestInput(2)]);


    function createTestInput(key, showButton) {
        return <Tests key={key}>
            <IconInput type="text" placeholder="Input"><BsArrowLeftRight /></IconInput>
            <IconInput type="text" placeholder="Output"><BsArrowLeftRight /></IconInput>
            {showButton && <Button type="button" click={deleteTest.bind(null, key)}><BsFillTrashFill /></Button>}
            {!showButton && <div style={{ visibility: "hidden" }}><Button type="button"><BsFillTrashFill /></Button></div>}
        </Tests>;
    }

    function addTestInput(key) {
        let tempKey = key;
        const keys = tests.map(el => parseInt(el.key));
        while (keys.includes(tempKey)) {
            tempKey++;
        }
        setTests(current => [...current, createTestInput(tempKey, true)]);
    }

    function deleteTest(index) {
        setTests(current => current.filter(el => el.key != index));
    }

    return <Wrapper>
        <LeftWrapper>
            <TextEditorWrapper>
                <TextEditor change={setEditorState} />
            </TextEditorWrapper>
            <FormWrapper>
                <TestWrapper>
                    <IconInput type="text" placeholder="Title"><BsCardHeading /></IconInput>
                </TestWrapper>
                <TestWrapper>
                    <DropDown options={["Easy", "Normal", "Hard"]} value={dropDownValue} select={setDropdownValue}><BsFillStarFill /></DropDown>
                </TestWrapper>
                <TestWrapper>
                    <TextArea placeholder="Starting template" change={setTest} rows={5}><BsCardHeading /></TextArea>
                </TestWrapper>
                <TestWrapper>
                    <h3>Tests</h3>
                    {tests.map((element, index) => {
                        return element;
                    })}
                </TestWrapper>
                <SecondaryButton type="button" click={addTestInput.bind(null, tests.length)} title="Add Test"></SecondaryButton>
                <SecondaryButton type="button" click={() => { console.log(test) }} title="Add Test"></SecondaryButton>
            </FormWrapper>
        </LeftWrapper>
        <RightWrapper>
            <ToolBar >Tool bar</ToolBar>
            <TableWrapper></TableWrapper>
        </RightWrapper>
    </Wrapper>;
}

const Wrapper = styled.div`
    padding: 16px;
    height: 83%;
    display: flex;
    flex-direction: column-reverse;

    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

const LeftWrapper = styled.div`
    padding: 8px;
    margin: 2px;
    height: 100%;
    flex: 1;
    background-color: var(--secondary-color);
    display: flex;
    flex-direction: column;
`

const RightWrapper = styled.div`
    padding: 8px;
    margin: 2px;
    height: 100%;
    flex: 1;
    background-color: var(--secondary-color);
    display: flex;
    flex-direction: column;
`
const TextEditorWrapper = styled.div`
 
`;

const FormWrapper = styled.div`
    flex: 1;
    margin-top: 8px;
`;

const ToolBar = styled.div`

`;

const TableWrapper = styled.div`
    flex: 1;
    // background-color: #fff;
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

export default AdminPanel;