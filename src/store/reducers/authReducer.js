import * as actionTypes from '../actions/actionTypes';

const initialState = {
    user: {},
    is_authenticated: false,
}

const AuthReducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_AUTH:
            return action.payload;
        case actionTypes.LOGIN_USER:
            return {
                user: action.payload,
                is_authenticated: true,
            }
        case actionTypes.LOGOUT_USER:
            return {
                user: {},
                is_authenticated: false,
            }
        default:
            return state;
    }
}
 
export default AuthReducer;