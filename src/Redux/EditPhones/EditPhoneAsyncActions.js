import { getToken } from "../../Jwt/token";

import { editPhoneFailure, editPhoneReq, editPhoneSuccess } from "../index";

import axios from "axios";

export const editPhones = (editedPhones)=>{
    return async(dispatch)=>{
        dispatch(editPhoneReq());
        const token = getToken("userToken");
        const config = {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        
        const responseDataArray = [];
        editedPhones.map(async(phone) => {
                try{
                const response = await axios.patch(`/api/phones/${phone.id}`, {
                                                                    value:phone.value,
                                                                }, config);
                responseDataArray.push(response.data.data);
                }catch(error){
                    dispatch(editPhoneFailure(error.message))
                }
            })
            dispatch(editPhoneSuccess([...responseDataArray]));
        }


    
}