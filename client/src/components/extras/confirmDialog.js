import React from 'react';
import styled from 'styled-components';
import ButtonWrapper from './buttonWrapper';
import Button from './button';
import SecondaryButton from './secondaryButton';
import { BsXSquare } from "react-icons/bs";

const ConfirmDialog = ({status, title, cancel, ok}) => {
    return <Wrapper>
        <Dialog>
            <Header>
                <div>
                    {(status ? "Disable " : "Enable ") + title + "?"}
                </div>
                <div>
                    <ButtonWrapper type="button" click={cancel} ><BsXSquare/> </ButtonWrapper>
                </div>
            </Header>
            <Body>
                <Button title="Cancel" click={cancel}></Button>
                <SecondaryButton title={(status ? "Disable" : "Enable")} click={ok}></SecondaryButton>
            </Body>
        </Dialog>
    </Wrapper>
};

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    background-color: rgba(180, 180, 180, 0.2);
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Dialog = styled.div`
    min-width: 200px;
    padding: 8px;
    background-color: rgba(10,10,10,1);
    border-radius: 4px;
`;

const Header = styled.div`
    margin: 0;
    padding: 8px;
    display: flex;
    justify-content: space-between;

    & div {
        margin: 0 4px 0 4px;
    }
`;

const Body = styled.div`
    display: flex;
    justify-content: center;
    padding: 8px;
`;

export default ConfirmDialog;