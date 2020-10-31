import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import Button from './extras/button';
import {
    Link
  } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import userPlaceholder from '../assets/user.jpg';
import ButtonWrapper from './extras/buttonWrapper';
import { userLoggedOut } from '../redux/actions/authActions';
import { useHistory } from "react-router-dom";

const NavBar = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.auth);
    
    function generateFullname(firstname, lastname) {
        return firstname.charAt(0).toUpperCase() + firstname.substring(1) + ' ' +
            lastname.charAt(0).toUpperCase() + lastname.substring(1);
    }

    function logOut() {
        localStorage.clear();
        dispatch(userLoggedOut());
        // Make sure to replace UI with Sample Questions
    }

    const progressStyle = {
        background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,9,1) 35%, rgba(255,0,0,1) 100%)",
        height: "100%",
        width: ((userInfo.user.exp / 1000) * 100) + "%",
        borderRadius: "8px"
    }

    return <Wrapper>
        <LogoWrapper>
            <button type="button" onClick={() => { history.push('/') }}>
                <Logo src={logo} alt="logo" />
            </button>
        </LogoWrapper>
        <NavExtras>
            {!userInfo.isAuthenticated && <InfoWrapper>
            <Link to="/login">
                <Button title={"Log in"}></Button>
            </Link>
            <Link to="/register">
                <Button title={"Sign up"}></Button>
            </Link>
            </InfoWrapper>}
            {userInfo.isAuthenticated && <>
            <InfoWrapper className="profile-section">
                <NameWrapper>
                    {generateFullname(userInfo.user.firstname, userInfo.user.lastname)}
                </NameWrapper>
                <Avatar src={userPlaceholder} alt="user picture" />
                <MenuDropDown>
                    <li><ButtonWrapper type="button" title="View profile" /></li>
                    { userInfo.user.role === 'admin' && 
                        <li><ButtonWrapper type="button" title="Admin panel" /></li>
                    }
                    <li><ButtonWrapper type="button" title="Log out" click={logOut}/></li>
                </MenuDropDown>
            </InfoWrapper>
            <InfoWrapper>Lvl&nbsp;<span>{userInfo.user.level}</span></InfoWrapper>
            <InfoWrapper>
                Exp
                <Bar>
                    <div style={progressStyle}></div>
                </Bar>
            </InfoWrapper>
            </>}
        </NavExtras>

    </Wrapper>
};

const Wrapper = styled.div`
    display: flex;
    background-color: var(--secondary-color);
    color: var(--main-font-color);
    align-items: stretch;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 99;
`;

const LogoWrapper = styled.div`
    padding: 8px 16px;
    flex: 1;

    & button {
        border: none;
        background-color: transparent;
        cursor: pointer;
    }

    & button:focus {
        outline: none;
    }
`;

const Logo = styled.img`
    width: 80px;
`;

const NavExtras = styled.div`
    display: flex;
    align-items: stretch;
    padding: 0px 16px;
`;

const InfoWrapper = styled.div`
    margin: 0 4px;
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 4px;
    & span {
        color: var(--ui-theme-color)
    }

    &:hover ul {
        display: block;
    }

    &.profile-section:hover {
      background-color: var(--main-bg-color);
      transition: background-color .2s ease-in-out;
    }
`;

const Bar = styled.div`
    width: 80px;
    height: 10px;
    border: 2px solid var(--main-font-color);
    border-radius: 8px;
    margin-left: 8px;
    padding: 0;
`;

const Avatar = styled.img`
    border-radius: 15px;
    max-width: 30px;
    margin-left: 8px;
    cursor: pointer;
`;

const NameWrapper = styled.div`
    cursor: pointer;
`;

const MenuDropDown = styled.ul`
    position: absolute;
    background: var(--secondary-color);
    border: 1px solid #ccc;
    border-top: none;
    width: 100%;
    list-style-type: none;
    padding: 0;
    margin: 0;
    top: 65px;
    z-index: 100;
    display: none;
    & li {
        padding: 4px 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: left;
    }

    & li:hover {
        background-color: #ccc;
        color: #000;
    }

    &:hover {
        display: block;
    }
`;


export default NavBar;