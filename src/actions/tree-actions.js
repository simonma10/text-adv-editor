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

