import {createStore} from "redux";
import { combineReducers } from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import { applyMiddleware } from "redux";

import userReducer from "./UserReducer";
import postReducer from './PostReducer';
import contactsReducer from "./Contacts/ContactsReducer"
import deleteReducer from "./Delete/DeleteReducer";
import addContactReducer from './AddContact/AddContactReducer';

import thunk from "redux-thunk";

const rootReducer = combineReducers({
    userInfo: userReducer,
    loginReq: postReducer,
    contactsReq: contactsReducer,
    newContacts: deleteReducer,
    responseOfAddnewContact:addContactReducer

})

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));


export default store;