import { ADD_PHONE_REQUEST } from "./AddPhoneTypes";
import { ADD_PHONE_FAILURE } from "./AddPhoneTypes";
import { ADD_PHONE_SUCCESS} from "./AddPhoneTypes";

export const addPhoneReq = ()=>{
    return{
        type: ADD_PHONE_REQUEST 
    }
}

export const addPhoneSuccess= (data)=>{
    return{
        type: ADD_PHONE_SUCCESS ,
        payload:data,
    }
}
export const addPhoneFailure = (error)=>{
    return{
        type: ADD_PHONE_FAILURE ,
        payload:error
    }
}