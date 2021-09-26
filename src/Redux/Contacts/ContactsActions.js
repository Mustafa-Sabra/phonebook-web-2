import {GET_CONTACTS_REQUEST} from "./ContactsTypes";
import {GET_CONTACTS_SUCCESS} from "./ContactsTypes";
import {GET_CONTACTS_FAILURE} from "./ContactsTypes";


export const getContactsReq = () => {
    return {
        type: GET_CONTACTS_REQUEST,
    }
}

export const getContactsSuccess = (data) => {
    return {
        type: GET_CONTACTS_SUCCESS,
        payload: data,
    }
}

export const getContactsFailure = (error) => {
    return {
        type: GET_CONTACTS_FAILURE,
        payload: error,
    }
}