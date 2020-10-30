import React from 'react';
import styled from 'styled-components';

const Button = ({ title, click, type, children }) => {
    return <Btn onClick={click} type={type}>{title}{children}</Btn>
};

const Btn = styled.button`
    color: var(--ui-theme-color);
    border: 1px solid var(--ui-theme-color);
    border-radius: 4px;
    padding: 8px 16px;
    background-color: rgba(0,0,0,0.2);
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;
    margin: 0px 4px;
    display: flex;
    align-items: center;

    &:hover {
        background-color: transparent;
        color: #cf4b32 !important
    }

    &:focus {
        outline: none;
    }
`;

export default Button;