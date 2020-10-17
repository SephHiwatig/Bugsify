import React from 'react';
import styled from 'styled-components';

const Question = () => {
    return (<Wrapper>I am question component!</Wrapper>);
};

const Wrapper = styled.div`
    display: flex;
    height: 100%;
    padding: 16px;
`;

export default Question;