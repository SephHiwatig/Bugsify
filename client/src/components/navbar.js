import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import Button from './extras/button';

const NavBar = () => {
    return <Wrapper>
        <LogoWrapper>
            <Logo src={logo} alt="logo" />
        </LogoWrapper>
        <NavExtras>
            <Button title={"Sign in"}></Button>
            <Button title={"Sign up"}></Button>
        </NavExtras>

    </Wrapper>
};

const Wrapper = styled.div`
    display: flex;
    background-color: var(--secondary-bg-color);
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