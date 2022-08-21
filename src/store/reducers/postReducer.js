import * as actionTypes from '../actions/actionTypes';

const initialState = [

]

const PostReducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_POST:
            return action.payload;
        case actionTypes.CREATE_POST:
            return [...state, action.payload]
        case actionTypes.DELETE_POST:
            let deletePostData = state.filter(p => p.id != action.payload.id)
            return [...deletePostData];
        case actionTypes.EDIT_POST:
            let editPostData = state.filter(p => p.id != action.payload.id)
            return [...editPostData, action.payload];
        default:
            return state;
    }
}
 
export default PostReducer;