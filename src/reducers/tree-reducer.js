import _ from 'lodash';

import * as types from '../actions/tree-action-types';

//const initialState = {};

const initialState = {
    config: {},
    messages:[],
    verbs:[],
    nouns:[],
    locations:[],
    items:[],
    conditions:[],
    status:'init'

}

export default function treeReducer(state = initialState, action){

    switch (action.type){
        case types.REQUEST_JSON:
            return Object.assign({}, state, {
                tree: loadData(action.url)
            });
            break;

        case types.RECEIVE_DATA:
            let data = action.results;
            console.log('reducer: receive');


            return Object.assign({}, state, {
                config: data.config,
                messages: data.messages,
                verbs: data.verbs,
                nouns: data.nouns,
                locations: data.locations,
                items: data.items,
                conditions: data.conditions,
                status: "loaded"

            });
            break;

        case types.REQUEST_DATA:
            console.log('reducer: request');
            return Object.assign({}, state, {
                status: 'loading'
            });
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