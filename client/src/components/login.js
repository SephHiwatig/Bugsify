import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import { BsPersonFill } from "react-icons/bs";
import { BsFillLockFill } from "react-icons/bs";
import Button from './extras/button';
import {
    Link
  } from "react-router-dom";

import IconInput from './extras/iconinput';

const Login = () => {
    return <Wrapper>
        <LoginForm>
            <Logo src={logo} alt="logo" />
            <InputWrapper>
                <IconInput placeholder="Username" type="text">
                    <BsPersonFill/>
                </IconInput>
            </InputWrapper>
            <InputWrapper>
                <IconInput placeholder="Password" type="password">
                    <BsFillLockFill/>
                </IconInput>
            </InputWrapper>
            <InputWrapper>
                <Button title="Log in" />
            </InputWrapper>
            <InputWrapper>
                <SignUpLink>
                    Not a member? <Link to="/register">Sign up</Link>
                </SignUpLink>
            </InputWrapper>
        </LoginForm>
    </Wrapper>;
};

const Wrapper = styled.div`
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LoginForm = styled.form`
    background-color: var(--secondary-color);
    border-radius: 15px;
    padding: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Logo = styled.img`
    display: block;
    width: 150px;
    margin: 16px 32px;
`;

const InputWrapper = styled.div`
    margin: 16px 32px 0px 32px;
`;

const SignUpLink = styled.span`
    & a {
        color: var(--ui-theme-color);
    }
`

export default Login;