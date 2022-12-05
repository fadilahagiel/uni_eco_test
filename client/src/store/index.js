import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'

const initialState = { users: [], user: {} }

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case `USER/FETCHSUCCESS`:
            return {
                ...state,
                users: action.payload
            };
        case `USER/FETCHONESUCCESS`:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state
    }
}

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store