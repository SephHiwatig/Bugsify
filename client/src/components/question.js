import React from 'react';
import styled from 'styled-components';

const Question = () => {
    return (<Wrapper>
        <Content>I am question component!</Content>
    </Wrapper>);
};

const Wrapper = styled.div`
    display: flex;
    height: 100%;
    background-color: var(--secondary-color);
`;

const Content = styled.div`
    padding: 8px;
`;

export default Question;