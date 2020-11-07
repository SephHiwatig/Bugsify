import React, { useEffect, useState} from 'react';
import styled from 'styled-components';
import Question from './question';
import { useDispatch, useSelector } from "react-redux";
import { fetchedKata } from '../../redux/actions/kataActions';
import ViewSolutions from './viewSolutions';
import { baseApi } from '../../environment';

const View = () => {
    const dispatach = useDispatch();
    const kata = useSelector((state) => state.kata);
    const userId = useSelector((state) => state.auth.user._id);
    const accessToken = useSelector(state => state.auth.accessToken);
    const [solutions, setSolutions] = useState([]);

    async function getSolutions(_id) {
        const data = await fetch(
            baseApi + "kata/solutions?_id=" + _id + "&userId=" + userId,
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

        if(data.ok){
            const res = await data.json();
            setSolutions(res);
        }
    }
    
    useEffect(() => {
        const kataStored = JSON.parse(localStorage.getItem('kata'));
        if(kataStored) {
            dispatach(fetchedKata(kataStored));
            getSolutions(kataStored._id);
        }
    }, [])

    return <Wrapper>
            <Question kata={kata} />

            {solutions.map(solution => {
                return <ViewSolutions solution={solution} key={solution._id}/>
            })}
    </Wrapper>
};

const Wrapper = styled.div`
    margin: 16px 0;

    @media(min-width: 768px) {
        margin: 16px 10%;
    }
`;



export default View;