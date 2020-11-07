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
    const username = useSelector((state) => state.auth.user.username);
    const accessToken = useSelector(state => state.auth.accessToken);
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false)
    const [commentValue, setCommentValue] = useState("");

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

    async function addComment() {

        const body = {
            commentById: userId,
            commentBy: username,
            commentDate: new Date(),
            comment: commentValue,
            solutionId: solution._id
        }

        const data = await fetch(
            baseApi + "kata/solutions/comments/add",
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken,
                }
            }
        )

        if(data.ok) {
            const res = await data.json();

            setComments(current => {
                return produce(current, draftState => {
                    draftState.push(res);
                })
            })

            setCommentValue("");
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

                            if(comments.length === 0) {
                                // Fetch the comments then show comments
                            }

                            setShowComments(!showComments) 
                        }}>Comments {solution.commentCount}</ButtonWrapper>
                    </span>
                </InfoWrapper>
                {showComments && <CommentsWrapper>
                    {comments.map(comm => {
                        return  <Comment key={comm._id}>
                            <CommentHeader>{comm.commentBy}</CommentHeader>
                            <p>
                                {comm.comment}
                            </p>
                        </Comment>
                    })}
                    <TextArea placeholder="Comment here" rows="3" change={(e) => {
                        setCommentValue(e.target.value);
                    }} value={commentValue}></TextArea>
                    <CommentButonWrapper>
                        <Button title="Comment" click={addComment} />
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