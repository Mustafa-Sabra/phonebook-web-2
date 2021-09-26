import { MAP_USER_INFO } from "./Login/LoginTypes";
import { MAP_REG_INFO } from "./Registration/RegTypes";

const initialState = {};

const userReducer = (state = initialState, action)=>{
    switch(action.type){
        case MAP_USER_INFO:
            return {
                "email": action.payload.email,
                "password":action.payload.password
            }
        case MAP_REG_INFO:
            return{
                "name": action.payload.fullName,
                "email": action.payload.email,
                "password":action.payload.password,
            }
        default: return state;
    }
}

export default userReducer;