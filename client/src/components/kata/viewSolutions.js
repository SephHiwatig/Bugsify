import React, { useState} from 'react';
import styled from 'styled-components';
import TextArea from '../extras/textArea';
import ButtonWrapper from '../extras/buttonWrapper';

const ViewSolutions = ({_id}) => {
    const [comment, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false)

    return <SolutionsWrapper>
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
                        <ButtonWrapper click={() => {

                            if(comment.length === 0) {
                                // Fetch the comments then show comments
                            }

                            setShowComments(!showComments) 
                        }}>Comments 1</ButtonWrapper>
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


export default ViewSolutions;