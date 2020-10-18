import { createStore } from "redux";
import combinedReducers from "./reducers/combinedReducer";

export default function configureStore(initialState) {

    const accessToken = localStorage.getItem('accessToken');
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const user = JSON.parse(localStorage.getItem('user'));

    if(accessToken && isAuthenticated && user) {
        initialState.auth = {
            accessToken,
            isAuthenticated,
            user
        }
    }


    const store = createStore(
        combinedReducers,
        initialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
}