import React from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Kata from './components/kata';
import styled from 'styled-components';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    --main-bg-color: #424242;
    --secondary-bg-color: #262729;
    --ui-color: #1d1d1f;
    --ui-theme-color: #bb432c;
    --main-font-color: #f8f9fa;
  }
`

function App() {
  return (
    <>
      <GlobalStyles />
      <Main>
        <Navbar></Navbar>
        <Content>
          <Kata></Kata>
        </Content>
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

const Content = styled.div`
  flex: 1;
`;


export default App;
