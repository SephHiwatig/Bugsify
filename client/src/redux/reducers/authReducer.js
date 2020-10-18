import { LOGGED_IN, LOGGED_OUT } from '../actions/actionTypes';

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
        default: return state;
    }
};

export default authReducer;