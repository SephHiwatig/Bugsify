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
import { baseApi } from '../environment';

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

    const register = async (value) => {
        // Check that all fields has input
        const keys = Object.keys(value);
        let isInvalid = false;
        keys.forEach(key => {
            if(!value[key]) {
                setError("All fields are required");
                isInvalid = true;
            }
        })
        if(isInvalid) return;
        
        //register user
        const data = await fetch(
          baseApi + "register",
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
            const response = await data.json();
            console.log('ok', response);
            setError("");
        } else {
            const response = await data.json();
            if(response.message)
                setError(response.message);
        }
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
            <PasswordConstraints>
                <li>Minimum of 8 characters</li>
                <li>Must contain at least 1 uppercase, lowecase and digit</li>
                <li>Must not contain spaces</li>
            </PasswordConstraints>
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
    padding: 16px 32px 32px 32px;
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
    word-wrap: break-word;
    max-width: 100%;
`;

const PasswordConstraints = styled.ul`
    font-size: 10px;
    color: #aaa;
    padding-left: 30px;
    width: 100%;
`

export default Register;