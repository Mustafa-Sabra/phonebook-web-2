import { ADD_CONTACT_REQUEST } from './AddContactTypes';
import { ADD_CONTACT_SUCCESS } from './AddContactTypes';
import { ADD_CONTACT_FAILURE } from './AddContactTypes';


export const addContactReq = ()=>{
    return{
        type:ADD_CONTACT_REQUEST
    }
}

export const addContactSuccess = (response)=>{
    return{
        type:ADD_CONTACT_SUCCESS,
        payload:response
    }
}

export const addContactFailure = (error)=>{
    return{
        type:ADD_CONTACT_FAILURE,
        payload:error
    }
}