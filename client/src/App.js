import React from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Kata from './components/kata';
import Login from './components/login';
import Register from './components/register';
import styled from 'styled-components';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    --main-bg-color: #424242;
    --secondary-color: #262729;
    --ui-theme-color: #bb432c;
    --main-font-color: #f8f9fa;
    color: var(--main-font-color);
    font-family: 'Oswald', sans-serif;
  }
`

function App() {
  return (
    <>
      <GlobalStyles />
      <Main>
        {true && <ContentWrapper>
          <Content>
            <Navbar></Navbar>
            <Kata></Kata>
          </Content>
        </ContentWrapper>}
        {false && <ContentWrapper>
          <Content>
          <Register></Register>
          </Content>
        </ContentWrapper>}
        <Footer></Footer>
      </Main>
    </>);
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--main-bg-color);
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: stretch;
`;

const Content = styled.div`
  flex:1;
`;

export default App;
