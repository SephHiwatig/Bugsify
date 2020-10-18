import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = ({title, click, type, children}) => {
return <Btn onClick={click} type={type}>{title}{children}</Btn>
};

const Btn = styled.button`
    color: inherit;
    border: none;
    background-color: transparent;
    cursor: pointer;
    margin: 0;
    padding: 0;
    font-size: inherit;
    font-family: inherit;
    width: 100%;
    height: 100%;
    &:focus {
        outline: none;
    }
    text-align: inherit;
`;

export default ButtonWrapper;