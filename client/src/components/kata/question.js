import React from 'react';
import styled from 'styled-components';
import { AiFillLike } from "react-icons/ai";
import ReadOnlyEditor from './editor';

const Question = ({kata}) => {
    return (<Wrapper>
        <Content>
            <QuestionTitle>{kata.title}</QuestionTitle>
            { kata.title && <Info>
                <InfoItem>Difficulty: {kata.difficulty}</InfoItem>
                <InfoItem>Answers: {kata.solutions.length}</InfoItem>
                <InfoItem><AiFillLike />: {kata.likes.length}</InfoItem>
            </Info>}
            <ReadOnlyEditor editorState={kata.editorState}/>
        </Content>
    </Wrapper>);
};

const Wrapper = styled.div`
    display: flex;
    height: 100%;
    background-color: var(--secondary-color);
`;

const Content = styled.div`
    padding: 8px;
`;

const QuestionTitle = styled.h1`
    font-size: 1.5rem;
    padding: 0;
    margin: 0;
`;

const Info = styled.ul`
    list-style: none;
    display: flex;
    padding: 0;
    margin-top: 8px;
    margin-bottom: 0px !important;
`;

const InfoItem = styled.li`
    margin: 0px 8px;
    display: flex;
    align-items: center;
`;

const Description = styled.div`
    margin: 0;
`;

export default Question;