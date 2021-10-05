import axios from "axios"
import { getContactsReq } from "../index"
import { getContactsSuccess } from "../index"
import { getContactsFailure } from "../index"

import { getToken } from "../../Jwt/token"

export const getContacts = ()=>{
    return async(dispatch)=>{
        dispatch(getContactsReq());
        const token = getToken("userToken");
        const config = {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        try{
            const res = await axios.get("/api/contacts", config);
            dispatch(getContactsSuccess(res.data.data));
        }catch(error){
            dispatch(getContactsFailure("error"));
        }
        
        
    }
}