import React from 'react';
import styled from 'styled-components';
import {
    BsFillSkipBackwardFill,
    BsFillSkipStartFill,
    BsFillSkipEndFill,
    BsFillSkipForwardFill
} from "react-icons/bs";
import ButtonWrapper from '../extras/buttonWrapper';

const Paginator = ({paging, onpage}) => {

    const PAGE_SIZE = 10;

    const totalPages = Math.ceil(paging.totalCount / paging.pageSize);

    const firstPage = 1;
    const previous = paging.pageNumber > 1 ? paging.pageNumber - 1 : 1;
    const next = paging.pageNumber < totalPages ? paging.pageNumber + 1: totalPages;
    const lastPage = totalPages;

    console.log(firstPage, previous, next, lastPage);

    return <Wrapper>
        <Navigation>
            <ButtonWrapper type="button" click={onpage.bind(null, PAGE_SIZE, firstPage)}><BsFillSkipBackwardFill /> </ButtonWrapper>
        </Navigation>
        <Navigation>
            <ButtonWrapper type="button" click={onpage.bind(null, PAGE_SIZE, previous)}><BsFillSkipStartFill /> </ButtonWrapper>
        </Navigation>

        {previous !== paging.pageNumber && <Navigation>
            <ButtonWrapper type="button" title={previous} click={onpage.bind(null, PAGE_SIZE, previous)}></ButtonWrapper>
        </Navigation>}
        <Navigation className="active-page">
            <ButtonWrapper type="button" title={paging.pageNumber}></ButtonWrapper>
        </Navigation>
        {next !== paging.pageNumber && <Navigation>
            <ButtonWrapper type="button" title={next} click={onpage.bind(null, PAGE_SIZE, next)}></ButtonWrapper>
        </Navigation>}

        <Navigation>
            <ButtonWrapper type="button" click={onpage.bind(null, PAGE_SIZE, next)}><BsFillSkipEndFill /> </ButtonWrapper>
        </Navigation>
        <Navigation>
            <ButtonWrapper type="button" click={onpage.bind(null, PAGE_SIZE, lastPage)}><BsFillSkipForwardFill /> </ButtonWrapper>
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

    &.active-page {
        background-color: var(--ui-theme-color);
    }

    &.active-page:hover {
        color: var(--main-font-color) !important;
    }
`;

export default Paginator;