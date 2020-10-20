import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.png';
import { BsPersonFill } from "react-icons/bs";
import { BsFillLockFill } from "react-icons/bs";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import Button from '../extras/button';
import {
    Link
} from "react-router-dom";
import { baseApi } from '../../environment';
import IconInput from '../extras/iconinput';
import { useDispatch } from "react-redux";
import { userLoggedIn } from '../../redux/actions/authActions';
import { useHistory } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [formValues, setFormValues] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState("");

    const login = async (value) => {

        //login user
        const data = await fetch(
            baseApi + "login",
            {
                method: "POST",
                body: JSON.stringify(value),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            }
        );

        if (data.ok) {
            const { accessToken, user } = await data.json();
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('isAuthenticated', true);
            localStorage.setItem('user', JSON.stringify(user));
            setError("");
            dispatch(userLoggedIn(accessToken, user, true));
            history.push('/')
        } else {
            const response = await data.json();
            setError(response.message);
        }
    }

    return <Wrapper>
        <LoginForm>
            <Logo src={logo} alt="logo" />
            {error && <InputWrapper>
                <Warning><BsFillExclamationTriangleFill />&nbsp;{error}</Warning>
            </InputWrapper>}
            <InputWrapper>
                <IconInput placeholder="Username" type="text" change={(event) => {
                    setFormValues({
                        ...formValues,
                        username: event.target.value
                    })
                }}>
                    <BsPersonFill />
                </IconInput>
            </InputWrapper>
            <InputWrapper>
                <IconInput placeholder="Password" type="password" change={(event) => {
                    setFormValues({
                        ...formValues,
                        password: event.target.value
                    })
                }}>
                    <BsFillLockFill />
                </IconInput>
            </InputWrapper>
            <InputWrapper>
                <Button title="Log in" click={login.bind(null, formValues)} type="button" />
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
    width: 100%;
    text-align: center;
`;

const SignUpLink = styled.span`
    & a {
        color: var(--ui-theme-color);
    }
`

const Warning = styled.div`
    border: 3px solid #fcca03;
    background-color: #f9fc3a;
    color: #000;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    word-wrap: break-word;
    max-width: 100%;
`;

export default Login;