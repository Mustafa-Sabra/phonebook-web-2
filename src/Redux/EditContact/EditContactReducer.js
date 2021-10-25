import { EDIT_CONTACT_REQUEST, EDIT_CONTACT_SUCCESS, EDIT_CONTACT_FAILURE } from "./EditContactTypes"

const initialState = {
    loading:false,
    data:"",
    error:""
}

const editContactReducer = (state = initialState, action) => {
    switch(action.type){
        case EDIT_CONTACT_REQUEST:
            return{
                ...state,
                loading:true,
            }
        case EDIT_CONTACT_SUCCESS:
            return{
                loading:false,
                data:action.payload,
                error:"",
            }
        case EDIT_CONTACT_FAILURE:
            return{
                loading:false,
                data:"",
                error:action.payload,
            }
        default: return state;
    }
}

export default editContactReducer;