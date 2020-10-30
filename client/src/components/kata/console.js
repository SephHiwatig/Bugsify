import React from 'react';
import styled from 'styled-components';
import SecondaryButton from '../extras/secondaryButton';
import Button from '../extras/button';

const Console = ({isAuth, skip}) => {
    return <Wrapper>
        <Terminal>
            <OutputList>
                <OutputItem>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et tristique tellus, ut egestas nibh. Duis consectetur purus tellus, vitae fermentum magna faucibus a. Praesent hendrerit, arcu at accumsan auctor, mi nunc faucibus quam, feugiat posuere tortor ante et mi. Aliquam varius porttitor aliquet. Sed blandit nunc quis dolor vulputate tempus. In tristique tellus eu orci ultrices, quis iaculis neque vestibulum. Aliquam id malesuada est. Aenean porttitor nulla a turpis posuere tempor ac id nibh. Phasellus in ex faucibus, efficitur dui a, commodo nibh. Vestibulum gravida luctus accumsan. Morbi malesua</OutputItem>
                <OutputItem>Success</OutputItem>
                <OutputItem>Success</OutputItem>
                <OutputItem>Success</OutputItem>
                <OutputItem>Success</OutputItem>
                <OutputItem>Success</OutputItem>
                <OutputItem>Success</OutputItem>
            </OutputList>
        </Terminal>
        <ButtonWrapper>
            { isAuth && <div><Button title="Skip" click={skip}></Button></div>}
            <div>
                <SecondaryButton title="Clear" />
                <SecondaryButton title="Submit" />
            </div>
        </ButtonWrapper>
    </Wrapper>
};

const Wrapper = styled.div`
`;

const Terminal = styled.div`
    border-radius: 4px;
    background-color: #000;
    height: 150px;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 12px;
    }
    
    &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(255,255,255,0.5); 
        border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        -webkit-box-shadow: inset 0 0 6px rgba(255,255,255,1); 
    }
`;

const ButtonWrapper = styled.div`
    padding: 8px 4px;
    display: flex;
    justify-content: space-between;
`;

const OutputList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`

const OutputItem = styled.li`
    margin-left: 16px;
`;

export default Console;