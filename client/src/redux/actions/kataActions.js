import { FETCHED, GAINED_EXP } from '../actions/actionTypes';

export const fetchedKata = (kata) => ({
    type: FETCHED,
    payload: {
        kata
    }
});