import { LOGGED_IN, LOGGED_OUT } from '../actions/actionTypes';

export const userLoggedIn = (accessToken, user, isAuthenticated) => ({
  type: LOGGED_IN,
  payLoad: {
    accessToken,
    user,
    isAuthenticated
  }
});

export const userLoggedOut = () => ({
  type: LOGGED_OUT
});