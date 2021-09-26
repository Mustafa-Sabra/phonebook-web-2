import axios from "axios";
import { postUserRequest } from "../index";
import { postUserSuccess } from "../index";
import { postUserFailure } from "../index";


export const userRegister = (user) =>{
    return (dispatch)=>{
        dispatch(postUserRequest());
        axios.post(`/api/register`, user)
        .then(res => {
            dispatch(postUserSuccess());
        })
        .catch(error => {
            const errorMsg = error.message;
            dispatch(postUserFailure(errorMsg));
        });
    }
}