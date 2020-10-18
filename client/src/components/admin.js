import React from 'react';
import styled from 'styled-components';

const AdminPanel = () => {
    return <Wrapper>
        <LeftWrapper>
            <TextEditorWrapper>
                Editor Goes Here
            </TextEditorWrapper>
            <FormWrapper>
                Form Goes Here
            </FormWrapper>
        </LeftWrapper>
        <RightWrapper>
            <ToolBar>Tool bar</ToolBar>
            <TableWrapper></TableWrapper>
        </RightWrapper>
    </Wrapper>;
}

const Wrapper = styled.div`
    padding: 16px;
    height: 83%;
    display: flex;
    flex-direction: column-reverse;

    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

const LeftWrapper = styled.div`
    padding: 8px;
    margin: 2px;
    height: 100%;
    flex: 1;
    background-color: var(--secondary-color);
    display: flex;
    flex-direction: column;
`

const RightWrapper = styled.div`
    padding: 8px;
    margin: 2px;
    height: 100%;
    flex: 1;
    background-color: var(--secondary-color);
    display: flex;
    flex-direction: column;
`
const TextEditorWrapper = styled.div`
    flex: 1;
`;

const FormWrapper = styled.div`
    flex: 1;
`;

const ToolBar = styled.div`

`;

const TableWrapper = styled.div`
    flex: 1;
    background-color: #fff;
`;

export default AdminPanel;