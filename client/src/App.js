import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Kata from './components/kata';
import Login from './components/login';
import Register from './components/register';
import AdminPenl from './components/admin';
import styled from 'styled-components';
import { baseApi } from './environment';
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from './redux/actions/authActions';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect 
} from "react-router-dom";

import { createGlobalStyle } from 'styled-components';
import AdminPanel from './components/admin';

const GlobalStyles = createGlobalStyle`
  html {
    --main-bg-color: #424242;
    --secondary-color: #262729;
    --ui-theme-color: #bb432c;
    --main-font-color: #f8f9fa;
    color: var(--main-font-color);
    font-family: 'Oswald', sans-serif;
  }
`;

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) => state.auth.user.role) === "admin";

  const verifyToken = async (accessToken) => {
    const data = fetch(
      baseApi + "verify/accesstoken",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken
        }
      }
    ).then(data => data.json())
    .then(data => {
      // const {accessToken, user} = data;
      // dispatch(userLoggedIn(accessToken, user, true));
    })
    .catch(error => {
      dispatch(userLoggedOut());
    });
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken) {
      verifyToken(accessToken);
    }
  }, [])

  

  return (
    <>
      <GlobalStyles />
      <Main>

        <Router>
          <Switch>
            <Route path="/login" render={(props) => (
              isAuth ? <Redirect to="/protected" /> : 
              <ContentWrapper>
                <Content>
                <Login></Login>
                </Content>
              </ContentWrapper>
            )}>
            </Route>
            <Route path="/register" render={(props) => (
              isAuth ? <Redirect to="/protected" /> : 
              <ContentWrapper>
                <Content>
                  <Register></Register>
                </Content>
              </ContentWrapper>
            )}>
            </Route>
            <Route path="/admin" render={(props) => (
              !isAuth || !isAdmin ? <Redirect to="/" /> : 
              <ContentWrapper>
                <Content>
                  <Navbar></Navbar>
                  <AdminPanel></AdminPanel>
                </Content>
              </ContentWrapper>
            )}>
            </Route>
            <Route path="/" render={(props) => (
              (
                <ContentWrapper>
                <Content>
                  <Navbar></Navbar>
                  <Kata></Kata>
                </Content>
              </ContentWrapper>
              )
            )}>
            </Route>
          </Switch>
        </Router>


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
`;

const Content = styled.div`
  flex:1;
`;

export default App;
