import axios from "axios";
import { delContactReq, delContactSuccess ,delContactFailure } from "../index"
import { getToken } from './../../Jwt/token';
 


export const deleteContact = (oldContacts, contact_id)=>{
    return async (dispatch)=>{
        dispatch(delContactReq());
        try{
            const token = getToken("userToken");
            const config = {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            };
            const deleted_id = await axios.delete(`/api/contacts/${contact_id}`, config);
            dispatch(delContactSuccess(oldContacts, deleted_id));
        }catch(error){
            dispatch(delContactFailure(oldContacts, error.message));
        }
        


    }

}