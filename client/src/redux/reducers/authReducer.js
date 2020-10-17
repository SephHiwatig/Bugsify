import { USER_REGISTERED, USER_LOOGED_IN } from '../actions/actionTypes';

const initialState = {
    token: "",
    user: {
        _id: null,
        username: "",
        firstname: "",
        lawstname: "",
        level: null,
        exp: null,
        role: "",
        questionsSolved: null
    }
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_REGISTERED: {
            return {
                ...state
            }
        }
        case USER_LOOGED_IN: {
            return {
                ...state
            }
        }
        default: return state;
    }
};

export default authReducer;