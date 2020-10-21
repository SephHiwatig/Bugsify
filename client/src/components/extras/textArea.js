import React from 'react';
import styled from 'styled-components';

const TextArea = ({ placeholder, change, rows, kata }) => {
    return <InputWrapper>
        <Area placeholder={placeholder} 
            onChange={change} 
            rows={rows} />
    </InputWrapper>;
};

const InputWrapper = styled.div`
    color: var(--main-font-color);
    background-color: rgba(0,0,0,0.2);
    padding: 8px;
    border-radius: 4px;
`;


const Area = styled.textarea`
    background-color: transparent;
    border: none;
    outline: none;
    color: var(--main-font-color) !important;
    width: 100%;
`;

export default TextArea;