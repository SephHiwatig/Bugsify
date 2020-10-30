import { FETCHED } from '../actions/actionTypes';
import { EditorState } from 'draft-js';
import { produce } from 'immer';
import { convertFromRaw } from 'draft-js';

const initialState = {
    _id: null,
    difficulty: "",
    description: "",
    tests: [["", "", ""], ["", "", ""], ["", "", ""]],
    isSampleKata: false,
    title: "",
    solutionTemplate: "",
    editorState: EditorState.createEmpty(),
    enabled: true,
    solutions: [],
    likes: []
}

const kataReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHED: {
            const newState = produce(state, draftState => {
                draftState._id = action.payload.kata._id;
                draftState.difficulty = action.payload.kata.difficulty;
                draftState.description = action.payload.kata.description;
                draftState.title = action.payload.kata.title;
                draftState.solutionTemplate = action.payload.kata.solutionTemplate;
                draftState.editorState = EditorState.createWithContent(convertFromRaw(action.payload.kata.editorState));
                draftState.solutions = action.payload.kata.solutions;
                draftState.enabled = action.payload.kata.enabled;
                draftState.likes = action.payload.kata.likes;
            })
            return newState;
        }
        default: return state;
    }
};

export default kataReducer;