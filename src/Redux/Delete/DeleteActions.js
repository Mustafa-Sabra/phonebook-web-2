import { DELETE_CONTACT_FAILURE } from "./DeleteTypes";
import { DELETE_CONTACT_REQUEST } from "./DeleteTypes";
import { DELETE_CONTACT_SUCCESS } from "./DeleteTypes";

export const delContactReq = ()=>{
    return{
        type:DELETE_CONTACT_REQUEST,
    }
}

export const delContactSuccess = (oldContacts, deleted_id)=>{
    return{
        type:DELETE_CONTACT_SUCCESS,
        oldData: oldContacts,
        deleted_id: deleted_id,
    }
}

export const delContactFailure = (oldContacts, errorMsg)=>{
    return{
        type:DELETE_CONTACT_FAILURE,
        oldData: oldContacts,
        error: errorMsg
    }
}