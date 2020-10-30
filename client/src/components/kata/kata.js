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
import { fetchedKata } from '../../redux/actions/kataActions';

const Kata = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const accessToken = useSelector(state => state.auth.accessToken);
    const _id = useSelector((state) => state.auth.user._id);
    const kata = useSelector((state) => state.kata);
    const [solution, setSolution] = useState("");
    const [consoleView, setConsole] = useState({
        passed: false,
        consoleList: []
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
                dispatch(fetchedKata(res));
                setSolution(res.solutionTemplate)
            } 
        } else {
            const data = await fetch(
                baseApi + "kata/question?_id=" + _id,
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
                dispatch(fetchedKata(res));
                setSolution(res.solutionTemplate)
            } 
        }
    }

    async function answerKata() {
        if(!isAuth) {
            const data = await fetch(
                baseApi + "kata/answer/sample",
                {
                    method: "PUT",
                    body: JSON.stringify({ _id: kata._id, solution: solution}),
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );
    
            if(data.ok) {
                const res = await data.json();
                const newState = produce(consoleView, draftState => {
                    draftState.consoleList.push(...res.consoleList);
                    draftState.passed = res.passed;
                })
                setConsole(newState);
            }
        } else {

        }
    }


    useEffect(() => {
        getKata();
    }, [isAuth])

    return (
        <Wrapper>
            <QuestionWrapper>
                <Question kata={kata}/>
            </QuestionWrapper>
            <SolutionWrapper>
                <EditorWrapper>
                    <EditorTitle>Solution</EditorTitle>
                    <CodeEditor template={solution} solution={setSolution}/>
                </EditorWrapper>
                <ConsoleWrapper>
                    <EditorTitle>Output</EditorTitle>
                    <Console isAuth={isAuth} skip={getKata} submit={answerKata} consoleState={consoleView}/>
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