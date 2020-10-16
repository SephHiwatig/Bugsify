import React from 'react';
import styled from 'styled-components';

const NavBar = () => {
    return <Wrapper>I am a navbar!</Wrapper>
};

const Wrapper = styled.div`
    background-color: var(--secondary-bg-color);
    padding: 16px;
    color: var(--main-font-color);
`;

export default NavBar;