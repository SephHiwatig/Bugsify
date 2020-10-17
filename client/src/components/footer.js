import React from 'react';
import styled from 'styled-components';

const Footer = () => {
    return <Wrapper>
        <FooterList>
            <FooterItem>&copy; Joseph Hiwatig</FooterItem>
            <FooterItem>hiwatigjoseph@gmail.com</FooterItem>
            <FooterItem><a href="https://www.linkedin.com/in/joseph-hiwatig/" target="_blank" rel="noopener noreferrer">LinkedIn</a></FooterItem>
            <FooterItem><a href="https://www.linkedin.com/in/joseph-hiwatig/" target="_blank" rel="noopener noreferrer">Portfolio</a></FooterItem>
        </FooterList>
    </Wrapper>;
};

const Wrapper = styled.div`
    // background-color: rgba(82,82,158,0.2);
    padding: 16px;
    display: flex;
    justify-content: center;
`;

const FooterList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
`;

const FooterItem = styled.li`
    color: var(--main-font-color);
    margin: 4px 8px;

    & a {
        color: var(--ui-theme-color);
        text-decoration: none;
        font-weight: 800;
    }
`;
export default Footer;