import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import { BsPersonFill } from "react-icons/bs";
import { BsFillLockFill } from "react-icons/bs";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { BsLayoutSidebarInsetReverse } from "react-icons/bs";
import Button from './extras/button';

import IconInput from './extras/iconinput';

const Register = () => {
    const [formValues, setFormValues] = useState({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    function register(value) {
        // Check that all fields has input
        const keys = Object.keys(formValues);
        keys.forEach(key => {
            if(!formValues[key]) {
                setError("All fields are required");
                return;
            }
        })
        console.log(value);
    }

    return <Wrapper>
        <RegisterForm>
            <Logo src={logo} alt="logo" />
            {error && <InputWrapper>
            <Warning><BsFillExclamationTriangleFill/>&nbsp;{error}</Warning>
            </InputWrapper>}
            <InputWrapper>
                <IconInput placeholder="Username" type="text" change={(event) => {
                    setFormValues({
                        ...formValues,
                        username: event.target.value
                    })
                }}>
                    <BsPersonFill/>
                </IconInput>
            </InputWrapper>
            <InputWrapper>
                <IconInput placeholder="First name" type="text" change={(event) => {
                    setFormValues({
                        ...formValues,
                        firstname: event.target.value
                    })
                }}>
                    <BsLayoutSidebarInset/>
                </IconInput>
            </InputWrapper>
            <InputWrapper>
                <IconInput placeholder="Last name" type="text" change={(event) => {
                    setFormValues({
                        ...formValues,
                        lastname: event.target.value
                    })
                }}>
                    <BsLayoutSidebarInsetReverse/>
                </IconInput>
            </InputWrapper>
            <InputWrapper>
                <IconInput placeholder="Email" type="email" change={(event) => {
                    setFormValues({
                        ...formValues,
                        email: event.target.value
                    })
                }}>
                    <BsFillEnvelopeFill/>
                </IconInput>
            </InputWrapper>
            <InputWrapper>
                <IconInput placeholder="Password" type="password" change={(event) => {
                    setFormValues({
                        ...formValues,
                        password: event.target.value
                    })
                }}>
                    <BsFillLockFill/>
                </IconInput>
            </InputWrapper>
            <InputWrapper>
                <Button type="button" title="Register" click={register.bind(null, formValues)}/>
            </InputWrapper>
        </RegisterForm>
    </Wrapper>;
};

const Wrapper = styled.div`
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const RegisterForm = styled.form`
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

const Warning = styled.div`
    border: 3px solid #fcca03;
    background-color: #f9fc3a;
    color: #000;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default Register;