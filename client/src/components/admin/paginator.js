import React from 'react';
import styled from 'styled-components';
import {
    BsFillSkipBackwardFill,
    BsFillSkipStartFill,
    BsFillSkipEndFill,
    BsFillSkipForwardFill
} from "react-icons/bs";
import ButtonWrapper from '../extras/buttonWrapper';

const Paginator = () => {
    return <Wrapper>
        <Navigation>
            <ButtonWrapper type="button" ><BsFillSkipBackwardFill /> </ButtonWrapper>
        </Navigation>
        <Navigation>
            <ButtonWrapper type="button" ><BsFillSkipStartFill /> </ButtonWrapper>
        </Navigation>

        <Navigation>
            <ButtonWrapper type="button" title="1"></ButtonWrapper>
        </Navigation>
        <Navigation>
            <ButtonWrapper type="button" title="2"></ButtonWrapper>
        </Navigation>
        <Navigation>
            <ButtonWrapper type="button" title="3"></ButtonWrapper>
        </Navigation>

        <Navigation>
            <ButtonWrapper type="button" ><BsFillSkipEndFill /> </ButtonWrapper>
        </Navigation>
        <Navigation>
            <ButtonWrapper type="button" ><BsFillSkipForwardFill /> </ButtonWrapper>
        </Navigation>
    </Wrapper>;
};

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Navigation = styled.div`
    background-color: rgba(0,0,0,0.2);
    border: 1px solid var(--ui-theme-color);
    min-width: 30px;
    border-radius: 4px;
    color: var(--main-font-color);
    margin: 2px;
    text-align: center;

    &:hover {
        background-color: transparent;
        color: #cf4b32 !important
    }
`;

export default Paginator;