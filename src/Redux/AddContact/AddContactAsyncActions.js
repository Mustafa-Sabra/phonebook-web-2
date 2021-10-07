import { addContactReq } from "../index";
import { addContactSuccess } from "../index";
import { addContactFailure } from "../index";

import { getToken } from './../../Jwt/token';

import axios  from 'axios';

export const postNewContact = (newContactInfo)=>{
    return async (dispatch)=>{
        dispatch(addContactReq());
        const token = getToken("userToken");
        const config = {
            headers:{
                Authorization:`Bearer ${token}`,
            }
        }
        try{
            const res = await axios.post("/api/contacts", newContactInfo, config);
            dispatch(addContactSuccess(res.data.data));
        }catch(error){
            console.log(error.message);
            dispatch(addContactFailure(error.message));
        }
        
    }
}