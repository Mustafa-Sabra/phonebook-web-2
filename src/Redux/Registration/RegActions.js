import {MAP_REG_INFO} from "./RegTypes";


export const mapRegInfo = (newUser)=>{
    return {
        type: MAP_REG_INFO,
        payload: newUser
    }
}

