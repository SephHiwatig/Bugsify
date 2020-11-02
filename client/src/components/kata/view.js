import React, { useEffect} from 'react';
import styled from 'styled-components';
import Question from './question';
import { useDispatch, useSelector } from "react-redux";
import { fetchedKata } from '../../redux/actions/kataActions';

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
                <span>Claps 1</span> <span>Comments 1</span>
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
    background-color: #aaa;
    color: rgba(50,50,50);
    border-radius: 4px;
`;

const Solution = styled.div`
    background-color: var(--secondary-color);
    padding: 16px;
    color: var(--main-font-color);
    margin: 4px 0;
`;

export default View;