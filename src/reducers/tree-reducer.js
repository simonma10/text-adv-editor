import _ from 'lodash';

import * as types from '../actions/tree-action-types';

//const initialState = {};

const initialState = {
    payload: {},

}

export default function treeReducer(state = initialState, action){

    switch (action.type){
        case types.REQUEST_JSON:
            return Object.assign({}, state, {
                tree: loadData(action.url)
            });
            break;

        case types.RECEIVE_DATA:
            console.log('reducer: receive');
            console.log(action.results);

            return Object.assign({}, state, {
                payload: action.results
            });
            break;

        case types.REQUEST_DATA:
            console.log('reducer: request');
            return state;
            break;


        default:
            return state;

    }
}

function loadData(url){
    return fetch(url).then(response => {
        console.log(response.json);
        return response.json();
    }).catch(error => {
        return error;
    });
}