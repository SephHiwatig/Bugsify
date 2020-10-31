import { LOGGED_IN, LOGGED_OUT, GAINED_EXP } from '../actions/actionTypes';

const initialState = {
    accessToken: "",
    isAuthenticated: false,
    user: {
        _id: null,
        firstname: "",
        lastname: "",
        level: null,
        exp: null,
        role: ""
    }
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGGED_IN: {
            return {
                ...state,
                accessToken: action.payLoad.accessToken,
                isAuthenticated: action.payLoad.isAuthenticated,
                user: {
                    ...state.user,
                    _id: action.payLoad.user._id,
                    firstname: action.payLoad.user.firstname,
                    lastname: action.payLoad.user.lastname,
                    level: action.payLoad.user.level,
                    exp: action.payLoad.user.exp,
                    role: action.payLoad.user.role
                }
            }
        }
        case LOGGED_OUT: {
            return {
                accessToken: "",
                isAuthenticated: false,
                user: {
                    _id: null,
                    firstname: "",
                    lastname: "",
                    level: null,
                    exp: null,
                    role: ""
                }
            }
        }
        case GAINED_EXP: {
            const newState = {
                ...state,
                user: action.payload.user
            }

            localStorage.setItem('user', JSON.stringify(newState.user));

            return newState;
        }
        default: return state;
    }
};

export default authReducer;