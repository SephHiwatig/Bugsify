import React, { useEffect } from 'react';
import styled from 'styled-components';
import SecondaryButton from '../extras/secondaryButton';
import Button from '../extras/button';
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";
import { animateScroll } from "react-scroll";

const Console = ({isAuth, skip, submit, consoleState, clear}) => {

    useEffect(() => {
        animateScroll.scrollToBottom({
            containerId: "terminal"
          });
    }, [consoleState])
    return <Wrapper>
        <Terminal id="terminal">
            <OutputList>
                {consoleState.consoleList.map((item, index) => {
                    const style = {
                        color: item.passedTest ? "green" : "#ff2626"
                    };
                    return <OutputItem style={style} key={index}>
                        {item.passedTest && <AiFillCheckCircle />}
                        {!item.passedTest && <AiFillCloseCircle/>}
                        {item.message}
                    </OutputItem>
                })}
            </OutputList>
        </Terminal>
        <ButtonWrapper>
            { isAuth && <div><Button title="Next" click={skip}></Button></div>}
            <div>
                <SecondaryButton title="Clear" click={clear}/>
                <SecondaryButton title="Submit" click={submit}/>
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
    display: flex;
    align-items: center;

    & svg {
        margin-right: 4px;
    }
`;

export default Console;