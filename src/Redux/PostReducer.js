import {CLEAR_LOGIN_REQUEST, POST_USER_REQUEST, POST_USER_SUCCESS, POST_USER_FAILURE} from "./PublicTypes";

const initialReqState = {
    loading: false,
    status: "",
    error: "",
}
const postReducer = (state = initialReqState, action)=>{
    switch(action.type){
        case POST_USER_REQUEST:
            return { 
                    ...state, 
                    loading:true
            };
        case POST_USER_SUCCESS:
            return {
                    loading:false,
                    status: "success",
                    error: ""
            };
        case POST_USER_FAILURE:
            return {
                    loading:false,
                    status: "failure",
                    error:action.payload
            };
        case CLEAR_LOGIN_REQUEST:
            return{
                    loading:false,
                    status: "",
                    error:""
            }
        default: return state
    }
}

export default postReducer;