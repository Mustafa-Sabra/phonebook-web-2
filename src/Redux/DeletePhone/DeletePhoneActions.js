import { DELETE_PHONE_REQUEST } from "./../DeletePhone/DeletePhoneTypes";
import { DELETE_PHONE_FAILURE } from "./../DeletePhone/DeletePhoneTypes";
import { DELETE_PHONE_SUCCESS} from "./../DeletePhone/DeletePhoneTypes";

export const deletePhoneReq = ()=>{
    return{
        type: DELETE_PHONE_REQUEST 
    }
}

export const deletePhoneSuccess= (data)=>{
    return{
        type: DELETE_PHONE_SUCCESS ,
        payload:data,
    }
}
export const deletePhoneFailure = (error)=>{
    return{
        type: DELETE_PHONE_FAILURE ,
        payload:error
    }
}