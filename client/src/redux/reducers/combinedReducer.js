import { combineReducers } from "redux";

// IMPORT REDUCERS HERE
import authReducer from './authReducer';

const combinedReducers = combineReducers({
    auth: authReducer
});

export default combinedReducers;