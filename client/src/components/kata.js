import React from 'react';
import styled from 'styled-components';
import Question from './question';

const Kata = () => {
    return (
    <Wrapper>
        <QuestionWrapper>
            <Question />
        </QuestionWrapper>
        <SolutionWrapper>
            <EditorWrapper>
                EDITOR GOES HERE
            </EditorWrapper>
            <ConsoleWrapper>
                CONSOLE GOES HERE
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
    margin-bottom: 8px;
    padding: 8px;
`;

const ConsoleWrapper = styled.div`
    background-color: var(--secondary-color);
    padding: 8px;
`;

export default Kata;