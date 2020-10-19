import React, { useState } from 'react';
import styled from 'styled-components';
import TextEditor from './textEditor';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import IconInput from './extras/iconinput';
import { BsArrowLeftRight, BsFillTrashFill } from "react-icons/bs";
import Button from './extras/button';
import SecondaryButton from './extras/secondaryButton';

const AdminPanel = () => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(),
    );

    const [tests, setTests] = useState([createTestInput(0)]);


    function createTestInput(key) {
        return <Tests key={key}>
            <IconInput type="text" placeholder="input"><BsArrowLeftRight/></IconInput>
            <IconInput type="text" placeholder="output"><BsArrowLeftRight/></IconInput>
            <Button type="button" click={deleteTest.bind(null, key)}><BsFillTrashFill/></Button>
            </Tests>;
    }

    function addTestInput(key) {
        let tempKey = key;
        const keys = tests.map(el => parseInt(el.key));
        while(keys.includes(tempKey)) {
            tempKey++;
        }
        setTests(current => [...current, createTestInput(tempKey)]);
    }

    function deleteTest(index) {
        setTests(current => current.filter(el => el.key != index));
    }

    return <Wrapper>
        <LeftWrapper>
            <TextEditorWrapper>
                <TextEditor change={setEditorState}/>
            </TextEditorWrapper>
            <FormWrapper>
                <TestWrapper>
                    {tests.map( (element, index) => {
                        return element;
                    })}
                </TestWrapper>
                <SecondaryButton type="button" click={addTestInput.bind(null, tests.length)} title="Add Test"></SecondaryButton>
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
    flex: 1;
`;

const FormWrapper = styled.div`
    flex: 1;
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
`;

const Tests = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
`;

export default AdminPanel;