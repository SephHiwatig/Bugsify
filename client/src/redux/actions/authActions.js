import { USER_LOOGED_IN } from '../actions/actionTypes';

export const userLoggedIn = (accessToken, user, isAuthenticated) => ({
      type: USER_LOOGED_IN,
      payLoad: {
        accessToken,
        user,
        isAuthenticated
      }
    });