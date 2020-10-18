import React from 'react';
import styled from 'styled-components';
import Question from './question';
import CodeEditor from './codeEditor';
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
                <CodeEditor />
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
    flex-direction: column;

    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

const QuestionWrapper = styled.div`
    flex: 1;
    margin: 4px;
`;

const SolutionWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 4px;
`;

const EditorWrapper = styled.div`
    flex: 1;
    background-color: var(--secondary-color);
    margin-bottom: 24px;
    min-height: 200px;

    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

const EditorTitle = styled.span`
    padding: 8px;
`;

const ConsoleWrapper = styled.div`
    background-color: var(--secondary-color);
`;

export default Kata;