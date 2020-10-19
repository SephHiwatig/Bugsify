import React from 'react';
import styled from 'styled-components';
import ButtonWrapper from './buttonWrapper';

const Dropdown = ({ children, value, options, select }) => {
    return <InputWrapper>
        <Label>
            {children}
        </Label>
        <Input readOnly placeholder="Difficulty" value={value}>

        </Input>
        <OptionWrapper>
            {options.map((option, index) => {
                return <Option key={index}><ButtonWrapper title={option} click={select.bind(null, option)}></ButtonWrapper></Option>
            })}
        </OptionWrapper>
    </InputWrapper>;
};

const InputWrapper = styled.div`
    color: var(--main-font-color);
    display: flex;
    background-color: rgba(0,0,0,0.2);
    padding: 8px;
    border-radius: 4px;
    position: relative;
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
    width: 100%;
    
    &:focus + div {
        display: block;
    }
`;

const OptionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    position: absolute;
    top: 30px;
    left: 0;
    right: 0;
    background-color: #2e4975;
    border-radius: 4px;
    display: none;

    &:active {
        display: block;
    }
`;

const Option = styled.div`
    padding: 8px 8px 8px 30px;
     &:hover {
        background-color: #0a3273;
     }
`;

export default Dropdown;