import { combineReducers } from "redux";

// IMPORT REDUCERS HERE
import authReducer from './authReducer';
import kataReducer from './kataReducer';

const combinedReducers = combineReducers({
    auth: authReducer,
    kata: kataReducer
});

export default combinedReducers;