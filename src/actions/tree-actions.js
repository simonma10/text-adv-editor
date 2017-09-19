import fetch from 'isomorphic-fetch';
import polyfill from 'es6-promise';

import * as types from './tree-action-types';

export function requestJson (url) {
    return {
        type: types.REQUEST_JSON,
        payload: url
    }
}


export function requestData(url){
    return (dispatch) => {
        dispatch(requestedData(url))
        return fetch(url)
            .then(response => response.json())
            .then(data => dispatch(receiveData(data)))
            .catch(err => console.log(err));
    }
}

export function requestedData(url){
    return {
        type: types.REQUEST_DATA
    }
}

export function receiveData(payload = []){
    console.log('receive: ', payload);
    return {
        type: types.RECEIVE_DATA,
        payload: payload
    }
}

export function getConfig(){
    return {
        type: types.GET_CONFIG
    }
}

export function setConfig(configList){
    return {
        type: types.SET_CONFIG,
        payload: configList
    }
}