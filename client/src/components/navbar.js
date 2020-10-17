import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import Button from './extras/button';
import {
    Link
  } from "react-router-dom";

const NavBar = () => {
    return <Wrapper>
        <LogoWrapper>
            <Logo src={logo} alt="logo" />
        </LogoWrapper>
        <NavExtras>
            <Link to="/login">
                <Button title={"Log in"}></Button>
            </Link>
            <Link to="/register">
                <Button title={"Sign up"}></Button>
            </Link>
        </NavExtras>

    </Wrapper>
};

const Wrapper = styled.div`
    display: flex;
    background-color: var(--secondary-color);
    padding: 8px 16px;
    color: var(--main-font-color);
`;

const LogoWrapper = styled.div`
    flex: 1;
`;

const Logo = styled.img`
    width: 80px;
`;

const NavExtras = styled.div`
    display: flex;
    align-items: center;
`;


export default NavBar;