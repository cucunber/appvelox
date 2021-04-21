import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from 'redux-thunk';
import ExmapleDataReducer from "./ExampleDataReducer";
import ProfileReducer from "./ProfileReducer";
import RecoveryReducer from "./RecoveryReducer";

let reducers = combineReducers({
    profile: ProfileReducer,
    example: ExmapleDataReducer,
    recovery: RecoveryReducer,
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;