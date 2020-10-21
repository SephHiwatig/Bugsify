import React from 'react';
import styled from 'styled-components';

const CheckBox = ({ children, change, id, checked }) => {
    return <InputWrapper>
        <Label htmlFor={id}>
            {children}
        </Label>
        <Input id={id} type="checkbox" onChange={change} checked={checked}/>
    </InputWrapper>;
};

const InputWrapper = styled.div`
    color: var(--main-font-color);
    background-color: rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    padding: 8px;
    border-radius: 4px;
`;

const Label = styled.label`
    display: flex;
    align-items: center;
    margin: 0 4px;
    cursor: pointer;
`;

const Input = styled.input`
    background-color: transparent;
    border: none;
    outline: none;
    color: var(--main-font-color) !important;
    cursor: pointer;
`;

export default CheckBox;