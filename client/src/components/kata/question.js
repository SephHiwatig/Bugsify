import React from 'react';
import styled from 'styled-components';
import { AiFillLike } from "react-icons/ai";

const Question = () => {
    return (<Wrapper>
        <Content>
            <QuestionTitle>Did I Finish my Sudoku?</QuestionTitle>
            <Info>
                <InfoItem>Difficulty: Easy</InfoItem>
                <InfoItem>Answers: 523</InfoItem>
                <InfoItem><AiFillLike />: 100</InfoItem>
            </Info>
            <Description>
                <p>This time we want to write calculations using functions and get the results. Let's have a look at some examples:</p>

                <p>seven(times(five())) # must return 35
                four(plus(nine())) # must return 13
                eight(minus(three())) # must return 5
                six(divided_by(two())) # must return 3
                Requirements:</p>

                <p>There must be a function for each number from 0 ("zero") to 9 ("nine")
                There must be a function for each of the following mathematical operations: plus, minus, times, dividedBy (divided_by in Ruby and Python)
                Each calculation consist of exactly one operation and two numbers
                The most outer function represents the left operand, the most inner function represents the right operand
                Division should be integer division. For example, this should return 2, not 2.666666...:
                eight(divided_by(three()))</p>
            </Description>
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
    margin: 8px 0;
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