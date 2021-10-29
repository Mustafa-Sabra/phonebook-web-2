import { EDIT_PHONE_REQUEST, EDIT_PHONE_SUCCESS, EDIT_PHONE_FAILURE,  } from "../EditPhones/EditPhoneTypes"
const initialState = {
    loading: false,
    data: [] ,
    error:""
}

const editPhoneReducer = (state = initialState, action)=>{
    switch(action.type){
        case EDIT_PHONE_REQUEST:
            return{
                ...state,
                loading: true,
            }
        case EDIT_PHONE_SUCCESS:
            return{
                loading: false,
                data:action.payload,
                error:""
            }
        case EDIT_PHONE_FAILURE:
            return{
                loading: false,
                data:[],
                error:action.payload
            }
        default: return state
    }
}

export default editPhoneReducer;