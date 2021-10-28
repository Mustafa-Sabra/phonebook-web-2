import { getToken } from "../../Jwt/token";
import { addPhoneReq, addPhoneSuccess, addPhoneFailure } from "../index"

import axios from "axios";

export const addNewPhone = (addedPhones, contact_id)=>{
    return (dispatch)=>{
        dispatch(addPhoneReq());
        const token = getToken("userToken");
        const config = {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        const reponseDataArray = [];
        if(addedPhones.length){
            addedPhones.map(async(phone) => {
                try{
                const response = await axios.post("/api/phones", {
                                                                    contact_id: contact_id,
                                                                    type_id: phone.type_id,
                                                                    value:phone.value,
                                                                }, config);
                reponseDataArray.push(response.data.data);
                }catch(error){
                    dispatch(addPhoneFailure(error.message))
                }
            })
            dispatch(addPhoneSuccess([...reponseDataArray]));
        }


    }
}