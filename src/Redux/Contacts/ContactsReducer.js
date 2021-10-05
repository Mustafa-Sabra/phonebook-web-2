import {GET_CONTACTS_REQUEST} from "./ContactsTypes";
import {GET_CONTACTS_SUCCESS} from "./ContactsTypes";
import {GET_CONTACTS_FAILURE} from "./ContactsTypes";

const initialState = {
    loading: false,
    data: [],
    error: ""
}

const contactsReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_CONTACTS_REQUEST:
            return{
                ...state,
                loading:true,
            }
        case GET_CONTACTS_SUCCESS:
            return{
                loading: false,
                data : action.payload,
                error:""
            }
        case GET_CONTACTS_FAILURE:
            return{
                loading: false,
                data : [],
                error:action.payload
            }
        default: return state
    }
}

export default contactsReducer;