import React from 'react';
import styled from 'styled-components';
import userPlaceholder from '../../assets/user.jpg';

const Profile = () => {
    return <Wrapper>
        <ProfileHeader>
            <img src={userPlaceholder} />
            <h2>Joseph Hiwatig Lvl 3</h2>
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