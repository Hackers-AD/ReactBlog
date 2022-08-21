import * as actionTypes from '../actions/actionTypes';

const initialState = [

]

const UserReducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_USER:
            return action.payload;
        case actionTypes.CREATE_USER:
            return [...state, action.payload]
        case actionTypes.EDIT_USER:
            let editUserData = state.filter(u => u.id != action.id)
            return [...editUserData, action.payload];
        default:
            return state;
    }
    return state;
}
 
export default UserReducer;