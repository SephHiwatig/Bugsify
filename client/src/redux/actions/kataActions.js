import { FETCHED } from '../actions/actionTypes';

export const fetchedKata = (kata) => ({
    type: FETCHED,
    payload: {
        kata
    }
});