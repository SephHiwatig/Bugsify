import { createStore } from "redux";
import combinedReducers from "./reducers/combinedReducer";

export default function configureStore(initialState) {

    const store = createStore(
        combinedReducers,
        initialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
}