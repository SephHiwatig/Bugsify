import React from 'react';
import styled from 'styled-components';

const Kata = () => {
    return (
    <Wrapper>
        <QuestionWrapper>
            Question goes here
        </QuestionWrapper>
        <SolutionWrapper>
            Solution goes here
        </SolutionWrapper>
    </Wrapper>);
};

const Wrapper = styled.div`
    display: flex;
    height: 100%;
    padding: 16px;
`;

const QuestionWrapper = styled.div`
    flex: 1;
`;

const SolutionWrapper = styled.div`
    flex: 1;
`;

export default Kata;