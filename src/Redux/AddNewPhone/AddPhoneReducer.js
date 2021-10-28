import { ADD_PHONE_REQUEST, ADD_PHONE_SUCCESS, ADD_PHONE_FAILURE,  } from "../AddNewPhone/AddPhoneTypes"
const initialState = {
    loading: false,
    data: [] ,
    error:""
}

const addPhoneReducer = (state = initialState, action)=>{
    switch(action.type){
        case ADD_PHONE_REQUEST:
            return{
                ...state,
                loading: true,
            }
        case ADD_PHONE_SUCCESS:
            return{
                loading: false,
                data:action.payload,
                error:""
            }
        case ADD_PHONE_FAILURE:
            return{
                loading: false,
                data:[],
                error:action.payload
            }
        default: return state
    }
}

export default addPhoneReducer;