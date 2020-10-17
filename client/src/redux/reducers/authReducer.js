import { USER_REGISTERED, USER_LOOGED_IN } from '../actions/actionTypes';

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
        case USER_REGISTERED: {
            return {
                ...state,
            }
        }
        case USER_LOOGED_IN: {
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
        default: return state;
    }
};

export default authReducer;