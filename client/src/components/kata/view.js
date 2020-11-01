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
        <KataWrapper>
            <Question kata={kata} />
        </KataWrapper>
    </Wrapper>
};

const Wrapper = styled.div`
    margin: 16px 0;

    @media(min-width: 768px) {
        margin: 16px 20%;
    }
`;

const KataWrapper = styled.div`

`;

export default View;