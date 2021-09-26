import axios from "axios";
import { addToken } from "../../Jwt/token";

import { postUserRequest } from "../index";
import { postUserSuccess } from "../index";
import { postUserFailure } from "../index";


export const userLogin = (user) =>{
    return (dispatch)=>{
        dispatch(postUserRequest());
        axios.post(`/api/login`, user)
        .then(res => {
            const token = res.data.token;
            addToken("userToken", token);
            dispatch(postUserSuccess());
        })
        .catch(error => {
            const errorMsg = error.message;
            dispatch(postUserFailure(errorMsg));
        });
    }
}


