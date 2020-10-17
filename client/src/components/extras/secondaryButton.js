import React from 'react';
import styled from 'styled-components';

const SecondaryButton = ({title}) => {
return <Btn>{title}</Btn>
};

const Btn = styled.button`
    color: #6795de;
    border: 1px solid #6795de;
    border-radius: 4px;
    padding: 8px 16px;
    background-color: rgba(0,0,0,0.2);
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;
    margin: 0px 4px;

    &:hover {
        background-color: transparent;
        color: #91b2e7 !important
    }

    &:focus {
        outline: none;
    }
`;

export default SecondaryButton;