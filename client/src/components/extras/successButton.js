import React from 'react';
import styled from 'styled-components';

const SuccessButton = ({ title, click, type, children }) => {
    return <Btn onClick={click} type={type}>{title}{children ? " " : null}{children}</Btn>
};

const Btn = styled.button`
    color: #004085;
    border: 2px solid #b8daff;
    border-radius: 4px;
    padding: 8px 16px;
    background-color: #cce5ff;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;
    margin: 0px 4px;

    &:hover {
        background-color: #004085;
        color: var(--main-font-color);
        border: 2px solid #004085;
    }

    &:focus {
        outline: none;
    }

    &:active {
        transform: scale(0.9);
        transition: transform 0.15s ease-in-out;
    }
`;

export default SuccessButton;