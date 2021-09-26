import {createStore} from "redux";
import { combineReducers } from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import { applyMiddleware } from "redux";

import userReducer from "./UserReducer";
import postReducer from './PostReducer';
import contactsReducer from "./Contacts/ContactsReducer"

import thunk from "redux-thunk";

const rootReducer = combineReducers({
    userInfo: userReducer,
    loginReq: postReducer,
    contactsReq: contactsReducer,

})

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));


export default store;