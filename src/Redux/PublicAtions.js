import {POST_USER_REQUEST} from "./PublicTypes";
import {POST_USER_SUCCESS} from "./PublicTypes";
import {POST_USER_FAILURE} from "./PublicTypes";
import {CLEAR_LOGIN_REQUEST} from "./PublicTypes";

export const postUserRequest = ()=>{
    return{
        type: POST_USER_REQUEST,
    }
}

export const postUserSuccess = ()=>{
    return{
        type: POST_USER_SUCCESS,
    }
}

export const postUserFailure = (error)=>{
    return{
        type: POST_USER_FAILURE,
        payload:error
    }
}
export const clearLoginRequest = ()=>{
    return{
        type: CLEAR_LOGIN_REQUEST,
    }
}
