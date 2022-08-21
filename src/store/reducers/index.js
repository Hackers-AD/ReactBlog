import { combineReducers } from "redux";
import AuthReducer from './authReducer';
import PostReducer from './postReducer';
import UserReducer from './userReducer';


export const reducers = combineReducers({
    auth: AuthReducer,
    post: PostReducer,
    user: UserReducer
})