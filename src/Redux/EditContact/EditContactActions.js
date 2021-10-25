import { EDIT_CONTACT_REQUEST } from "./EditContactTypes";
import { EDIT_CONTACT_SUCCESS } from "./EditContactTypes";
import { EDIT_CONTACT_FAILURE } from "./EditContactTypes";

export const editContactReq = ()=>{
    return{
        type:EDIT_CONTACT_REQUEST,
    }
}
export const editContactSuccess = (data)=>{
    return{
        type:EDIT_CONTACT_SUCCESS,
        payload:data
    }
}
export const editContactFailure = (error)=>{
    return{
        type:EDIT_CONTACT_FAILURE,
        payload:error
    }
}