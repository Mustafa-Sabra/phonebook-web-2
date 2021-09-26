import {MAP_USER_INFO} from "./LoginTypes";

export const mapUserInfo = (user)=>{
    return {
        type: MAP_USER_INFO,
        payload: user
    }
}

