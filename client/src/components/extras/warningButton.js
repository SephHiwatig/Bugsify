import React from 'react';
import styled from 'styled-components';

const WarningButton = ({ title, click, type, children }) => {
    return <Btn onClick={click} type={type}>{title}{children ? " " : null}{children}</Btn>
};

const Btn = styled.button`
    color: #856404;
    border: 2px solid #ffeeba;
    border-radius: 4px;
    padding: 8px 16px;
    background-color: #fff3cd;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;
    margin: 0px 4px;

    &:hover {
        background-color: #856404;
        color: var(--main-font-color);
        border: 2px solid #856404;
    }

    &:focus {
        outline: none;
    }

    &:active {
        transform: scale(0.9);
        transition: transform 0.15s ease-in-out;
    }
`;

export default WarningButton;