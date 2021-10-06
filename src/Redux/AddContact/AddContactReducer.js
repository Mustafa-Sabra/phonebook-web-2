import { ADD_CONTACT_REQUEST } from "./AddContactTypes";
import { ADD_CONTACT_SUCCESS } from "./AddContactTypes";
import { ADD_CONTACT_FAILURE } from "./AddContactTypes";

const initialState = {
    loading:false,
    response:"",
    error:""
}
const addContactReducer = (state = initialState, action)=>{
    switch(action.type){
        case ADD_CONTACT_REQUEST:
            return{
                ...state,
                loading:true,
            }
        case ADD_CONTACT_SUCCESS:
            return{
                loading:false,
                response:action.payload,
                error:""
            }
        case ADD_CONTACT_FAILURE:
            return{
                loading:false,
                response:"",
                error:action.payload
            }
        default: return state;
    }
}

export default addContactReducer;