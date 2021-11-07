import { DELETE_PHONE_REQUEST, DELETE_PHONE_SUCCESS, DELETE_PHONE_FAILURE,  } from "../DeletePhone/DeletePhoneTypes"
const initialState = {
    loading: false,
    data: [] ,
    error:""
}

const deletePhoneReducer = (state = initialState, action)=>{
    switch(action.type){
        case DELETE_PHONE_REQUEST:
            return{
                ...state,
                loading: true,
            }
        case DELETE_PHONE_SUCCESS:
            return{
                loading: false,
                data:action.payload,
                error:""
            }
        case DELETE_PHONE_FAILURE:
            return{
                loading: false,
                data:[],
                error:action.payload
            }
        default: return state
    }
}

export default deletePhoneReducer;