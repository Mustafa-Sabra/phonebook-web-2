import { getToken } from "../../Jwt/token";

import { deletePhoneFailure, deletePhoneReq, deletePhoneSuccess } from "../index";

import axios from "axios";

export const deletePhones = (deletedPhones)=>{
    return async(dispatch)=>{
        dispatch(deletePhoneReq());
        const token = getToken("userToken");
        const config = {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        
        const responseDataArray = [];
        deletedPhones.map(async(phone) => {
                try{
                const response = await axios.delete(`/api/phones/${phone.id}`, config);
                responseDataArray.push(response.data.data);
                }catch(error){
                    dispatch(deletePhoneFailure(error.message))
                }
            })
            dispatch(deletePhoneSuccess([...responseDataArray]));
        }


    
}