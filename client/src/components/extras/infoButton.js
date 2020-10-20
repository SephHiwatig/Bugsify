import React from 'react';
import styled from 'styled-components';

const InfoButton = ({ title, click, type, children }) => {
    return <Btn onClick={click} type={type}>{title}{children ? " " : null}{children}</Btn>
};

const Btn = styled.button`
    color: #155724;
    border: 2px solid #c3e6cb;
    border-radius: 4px;
    padding: 8px 16px;
    background-color: #d4edda;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;
    margin: 0px 4px;

    &:hover {
        background-color: #155724;
        color: var(--main-font-color);
        border: 2px solid #155724;
    }

    &:focus {
        outline: none;
    }

    &:active {
        transform: scale(0.9);
        transition: transform 0.15s ease-in-out;
    }
`;

export default InfoButton;