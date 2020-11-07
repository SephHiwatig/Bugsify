import React, { useEffect} from 'react';
import styled from 'styled-components';
import Question from './question';
import { useDispatch, useSelector } from "react-redux";
import { fetchedKata } from '../../redux/actions/kataActions';
import ButtonWrapper from '../extras/buttonWrapper';
import TextArea from '../extras/textArea';

const View = () => {
    const dispatach = useDispatch();
    const kata = useSelector((state) => state.kata);
    
    useEffect(() => {
        const kata = JSON.parse(localStorage.getItem('kata'));
        if(kata) {
            dispatach(fetchedKata(kata));
        }
    }, [])

    return <Wrapper>
            <Question kata={kata} />
            <SolutionsWrapper>
                <span>By Joseph Hiwatig, October 12, 1993</span>
                <Solution>
                    {`function solve(arg) {

                    }`}
                </Solution>
                <InfoWrapper>
                    <span>
                        <ButtonWrapper>Claps 1</ButtonWrapper>
                    </span> 
                    <span>
                        <ButtonWrapper>Comments 1</ButtonWrapper>
                    </span>
                </InfoWrapper>
                <CommentsWrapper>
                    <Comment>
                        <CommentHeader>Joseph Test October 12, 1993</CommentHeader>
                        <p>
                            User's comment here
                        </p>
                    </Comment>
                    <Comment>
                        <CommentHeader>Joseph Test October 12, 1993</CommentHeader>
                        <p>
                            User's comment here
                        </p>
                    </Comment>
                    <Comment>
                        <CommentHeader>Joseph Test October 12, 1993</CommentHeader>
                        <p>
                            User's comment here
                        </p>
                    </Comment>
                    <TextArea placeholder="Comment here" rows="3" change={() => {}} value=""></TextArea>
                </CommentsWrapper>
            </SolutionsWrapper>
    </Wrapper>
};

const Wrapper = styled.div`
    margin: 16px 0;

    @media(min-width: 768px) {
        margin: 16px 10%;
    }
`;

const SolutionsWrapper = styled.div`
    margin-top: 16px;
    padding: 16px;
    background-color: #eee;
    color: rgba(50,50,50);
    border-radius: 4px;

    & span {
        display: inline;
    }
`;

const Solution = styled.div`
    background-color: var(--secondary-color);
    padding: 16px;
    color: var(--main-font-color);
    margin: 4px 0;
`;

const InfoWrapper = styled.div`
    display: flex;

    & span {
        margin-right: 8px;
    }
`;

const CommentsWrapper = styled.div`
    margin: 8px 0 0 5%;
`;

const Comment = styled.div`
    margin-bottom: 4px;
    border-left: 4px solid var(--ui-theme-color);
    padding: 8px;
    background-color: var(--main-bg-color);
    color: var(--main-font-color);
`;

const CommentHeader = styled.span`
    margin: 0;
    font-size: 12px;
`;
export default View;