import * as types from './tree-action-types';

export function requestJson (url) {
    console.log('request json');
    return {
        type: types.REQUEST_JSON,
        payload: url
    }
}

export function requestData () {
    console.log('request data');
    return {
        type: types.REQUEST_DATA
    }
}

export function receiveData (payload) {
    console.log('receive data');
    return {
        type: types.RECEIVE_DATA,
        payload: payload
    }
}

export function saveListItemDetails (payload) {
    return {
        type: types.SAVE_LIST_ITEM_DETAILS,
        payload: payload
    }
}

export function deleteListItem (payload){
    return {
        type: types.DELETE_LIST_ITEM,
        payload: payload
    }
}

export function saveLocationDetails (payload) {
    return {
        type: types.SAVE_LOCATION_DETAILS,
        payload: payload
    }
}

export function deleteLocation (payload){
    return {
        type: types.DELETE_LOCATION,
        payload: payload
    }
}

export function saveItemDetails (payload) {
    return {
        type: types.SAVE_ITEM_DETAILS,
        payload: payload
    }
}

export function deleteItem (payload){
    return {
        type: types.DELETE_ITEM,
        payload: payload
    }
}

export function saveConditionDetails (payload) {
    return {
        type: types.SAVE_CONDITION_DETAILS,
        payload: payload
    }
}

export function deleteCondition (payload){
    return {
        type: types.DELETE_CONDITION,
        payload: payload
    }
}

