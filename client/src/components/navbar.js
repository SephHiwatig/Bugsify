import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import Button from './extras/button';
import {
    Link
  } from "react-router-dom";
import { useSelector } from "react-redux";
import userPlaceholder from '../assets/user.jpg';

const NavBar = () => {
    const userInfo = useSelector((state) => state.auth);
    
    function generateFullname(firstname, lastname) {
        return firstname.charAt(0).toUpperCase() + firstname.substring(1) + ' ' +
            lastname.charAt(0).toUpperCase() + lastname.substring(1);
    }

    return <Wrapper>
        <LogoWrapper>
            <Logo src={logo} alt="logo" />
        </LogoWrapper>
        <NavExtras>
            {!userInfo.isAuthenticated && <>
            <Link to="/login">
                <Button title={"Log in"}></Button>
            </Link>
            <Link to="/register">
                <Button title={"Sign up"}></Button>
            </Link>
            </>}
            {userInfo.isAuthenticated && <>
            <InfoWrapper>{generateFullname(userInfo.user.firstname, userInfo.user.lastname)}</InfoWrapper>
            <InfoWrapper><Avatar src={userPlaceholder} alt="user picture" /></InfoWrapper>
            <InfoWrapper>Lvl <span>{userInfo.user.level}</span></InfoWrapper>
            <InfoWrapper>Exp <span>{userInfo.user.exp}</span></InfoWrapper>
            </>}
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

const InfoWrapper = styled.div`
    margin: 0 4px;
    & span {
        color: var(--ui-theme-color)
    }
`;

const Avatar = styled.img`
    border-radius: 15px;
    max-width: 30px;
`;


export default NavBar;