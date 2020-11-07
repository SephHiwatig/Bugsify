import React from 'react';
import styled from 'styled-components';
import userPlaceholder from '../../assets/user.jpg';
import construction from '../../assets/construction.gif';
import { useSelector } from "react-redux";

const Profile = () => {
    const user = useSelector((state) => state.auth.user);
    return <Wrapper>
        <ProfileHeader>
            <img src={userPlaceholder} />
            <h2>{user.username} Lvl {user.level}</h2>
        </ProfileHeader>
        <ProfileHeader>
            <img src={construction} />
        </ProfileHeader>
    </Wrapper>
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 16px 0;

    @media(min-width: 768px) {
        margin: 16px 20%;
    }
`;

const ProfileHeader = styled.div`

    & img {
        display: block;
        border-radius: 15px;
        width: 200px;
        height: 200px;
    }

    & h2 {
        text-align: center;
        margin: 0;
    }
`;

export default Profile;