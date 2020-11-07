import React, { useState} from 'react';
import styled from 'styled-components';
import TextArea from '../extras/textArea';
import ButtonWrapper from '../extras/buttonWrapper';
import Button from '../extras/button';
import SyntaxHighlighter from 'react-syntax-highlighter';
import  anOldHope  from 'react-syntax-highlighter/dist/esm/styles/hljs/an-old-hope';
import { useSelector } from "react-redux";
import { produce } from 'immer';
import { baseApi } from '../../environment';


const ViewSolutions = ({solution, setSolutions}) => {
    const userId = useSelector((state) => state.auth.user._id);
    const accessToken = useSelector(state => state.auth.accessToken);
    const [comment, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false)

    const likedStyle = {
        color: "blue"
    }

    async function toggleLike() {
        const data = await fetch(
            baseApi + "kata/solutions/like",
            {
                method: "PUT",
                body: JSON.stringify({ _id: solution._id, userId}),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken,
                    "Cache-control": "no-cache"
                }
            }
        );

        if(data.ok) {
            setSolutions(current => {
                const newState = produce(current, draftState => {
                    let temp = draftState.find(sol => sol._id === solution._id);
                    temp.isLiked = !solution.isLiked;
                    if(temp.isLiked) {
                        temp.likes += 1;
                    } else {
                        temp.likes -= 1;
                    }
                })
                return newState;
            })
        }
    }

    return <SolutionsWrapper>
                <span>{solution.answeredBy}</span>
                    <SyntaxHighlighter language="javascript" style={anOldHope}>
                        {solution.solution}
                    </SyntaxHighlighter>
                <InfoWrapper>
                    <span style={solution.isLiked ? likedStyle : {}}>
                        <ButtonWrapper click={toggleLike}>Claps {solution.likes}</ButtonWrapper>
                    </span> 
                    <span>
                        <ButtonWrapper click={() => {

                            if(comment.length === 0) {
                                // Fetch the comments then show comments
                            }

                            setShowComments(!showComments) 
                        }}>Comments {solution.commentCount}</ButtonWrapper>
                    </span>
                </InfoWrapper>
                {showComments && <CommentsWrapper>
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
                    <CommentButonWrapper>
                        <Button title="Comment" />
                    </CommentButonWrapper>
                </CommentsWrapper>}
            </SolutionsWrapper>
};

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

const CommentButonWrapper = styled.div`
    margin-top: 8px;
    padding: 0;
    border-radius: 4px;
    & button {
        margin: 0 !important;
        background-color: var(--secondary-color);
    }
`;


export default ViewSolutions;