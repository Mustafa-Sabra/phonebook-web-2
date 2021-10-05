import {DELETE_CONTACT_REQUEST} from "./DeleteTypes";
import {DELETE_CONTACT_SUCCESS} from "./DeleteTypes";
import {DELETE_CONTACT_FAILURE} from "./DeleteTypes";

const initialState = {
    loading: false,
    data: [],
    error: ""
}

const deleteReducer = (state= initialState, action)=>{
    switch(action.type){
        case DELETE_CONTACT_REQUEST:
            return{
                ...state,
                loading:true,
            }
        case DELETE_CONTACT_SUCCESS:
            return{
                loading:false,
                data: action.oldData.filter((contact) => contact.id !== action.deleted_id),
                error:""
            }
        case DELETE_CONTACT_FAILURE:
            return{
                loading:false,
                data: action.oldData,
                error:action.error
            }
        default: return state;
    }
}

export default deleteReducer;