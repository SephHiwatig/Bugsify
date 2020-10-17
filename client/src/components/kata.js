import React from 'react';
import styled from 'styled-components';
import Question from './question';
import TextEditor from './textEditor';
import Console from './console';

const Kata = () => {
    return (
    <Wrapper>
        <QuestionWrapper>
            <Question />
        </QuestionWrapper>
        <SolutionWrapper>
            <EditorWrapper>
                <EditorTitle>Solution</EditorTitle>
                <TextEditor />
            </EditorWrapper>
            <ConsoleWrapper>
                <EditorTitle>Output</EditorTitle>
                <Console/>
            </ConsoleWrapper>
        </SolutionWrapper>
    </Wrapper>);
};

const Wrapper = styled.div`
    display: flex;
    padding: 16px;
    height: 83%;
`;

const QuestionWrapper = styled.div`
    flex: 1;
    margin-right: 8px;
`;

const SolutionWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const EditorWrapper = styled.div`
    flex: 1;
    background-color: var(--secondary-color);
    margin-bottom: 24px;
`;

const EditorTitle = styled.span`
    padding: 8px;
`;

const ConsoleWrapper = styled.div`
    background-color: var(--secondary-color);
`;

export default Kata;