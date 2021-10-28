import { EDIT_PHONE_REQUEST } from "../EditPhones/EditPhoneTypes";
import { EDIT_PHONE_FAILURE } from "../EditPhones/EditPhoneTypes";
import { EDIT_PHONE_SUCCESS} from "../EditPhones/EditPhoneTypes";

export const editPhoneReq = ()=>{
    return{
        type: EDIT_PHONE_REQUEST 
    }
}

export const editPhoneSuccess= (data)=>{
    return{
        type: EDIT_PHONE_SUCCESS ,
        payload:data,
    }
}
export const editPhoneFailure = (error)=>{
    return{
        type: EDIT_PHONE_FAILURE ,
        payload:error
    }
}