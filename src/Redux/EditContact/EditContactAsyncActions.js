import { editContactReq, editContactSuccess, editContactFailure } from "../index";

import { getToken } from "../../Jwt/token";

import axios from "axios";

export const editContact = (contact, id)=>{
    return async (dispatch)=>{
        dispatch(editContactReq());

        const token = getToken("userToken");
        const config = {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
        try{
            const res = await axios.patch(`/api/contacts/${id}`, contact, config);
            dispatch(editContactSuccess(res.data.data));
        }catch(error){
            dispatch(editContactFailure(error.message));
        }
        
    }
}