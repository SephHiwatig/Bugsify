import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Question from './question';
import CodeEditor from './codeEditor';
import Console from './console';
import { produce } from 'immer';
import { baseApi } from '../../environment';
import { EditorState } from 'draft-js';
import { convertFromRaw } from 'draft-js';
import { useDispatch, useSelector } from "react-redux";

const Kata = () => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const accessToken = useSelector(state => state.auth.accessToken);
    const _id = useSelector((state) => state.auth.user._id);

    const [kata, setKata] = useState({
        _id: null,
        difficulty: "",
        description: "",
        title: "",
        solutionTemplate: "",
        editorState: EditorState.createEmpty()
    })

    async function getKata() {
        if(!isAuth) {
            const data = await fetch(
                baseApi + "kata/sample",
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );
    
            if(data.ok) {
                const res = await data.json();
                setKata(produce(kata, draftState => {
                    draftState._id = res._id;
                    draftState.difficulty = res.difficulty;
                    draftState.description = res.description;
                    draftState.title = res.title;
                    draftState.solutionTemplate = res.solutionTemplate;
                    draftState.editorState = EditorState.createWithContent(convertFromRaw(res.editorState));
                }));
            } 
        } else {
            const data = await fetch(
                baseApi + "kata/question",
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + accessToken,
                        "Cache-control": "no-cache"
                    }
                }
            );
    
            if(data.ok) {
                const res = await data.json();
                setKata(produce(kata, draftState => {
                    draftState._id = res._id;
                    draftState.difficulty = res.difficulty;
                    draftState.description = res.description;
                    draftState.title = res.title;
                    draftState.solutionTemplate = res.solutionTemplate;
                    draftState.editorState = EditorState.createWithContent(convertFromRaw(res.editorState));
                }));
            } 
        }
    }


    useEffect(() => {
        getKata();
    }, [isAuth])

    return (
        <Wrapper>
            <QuestionWrapper>
                <Question title={kata.title} state={kata.editorState}/>
            </QuestionWrapper>
            <SolutionWrapper>
                <EditorWrapper>
                    <EditorTitle>Solution</EditorTitle>
                    <CodeEditor template={kata.solutionTemplate}/>
                </EditorWrapper>
                <ConsoleWrapper>
                    <EditorTitle>Output</EditorTitle>
                    <Console />
                </ConsoleWrapper>
            </SolutionWrapper>
        </Wrapper>);
};

const Wrapper = styled.div`
    display: flex;
    padding: 16px;
    min-height: 83%;
    flex-direction: column;

    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

const QuestionWrapper = styled.div`
    flex: 1;
    margin: 4px;
    min-height: 100%;
`;

const SolutionWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 4px;
    min-height: 100%;
`;

const EditorWrapper = styled.div`
    flex: 1;
    background-color: var(--secondary-color);
    margin-bottom: 24px;
    min-height: 200px;

    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

const EditorTitle = styled.span`
    padding: 8px;
`;

const ConsoleWrapper = styled.div`
    background-color: var(--secondary-color);
`;

export default Kata;