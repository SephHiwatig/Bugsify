import React from 'react';
import styled from 'styled-components';

const IconInput = ({children, placeholder, type}) => {
    return <InputWrapper>
        <Label>
            {children}
        </Label>
        <Input placeholder={placeholder} type={type}/>
    </InputWrapper>;
};

const InputWrapper = styled.div`
    color: var(--main-font-color);
    display: flex;
    background-color: rgba(0,0,0,0.2);
    padding: 8px;
    border-radius: 4px;
`;

const Label = styled.span`
    display: flex;
    align-items: center;
    margin: 0 4px;
`;

const Input = styled.input`
    background-color: transparent;
    border: none;
    outline: none;
    color: var(--main-font-color) !important;
`;

export default IconInput;