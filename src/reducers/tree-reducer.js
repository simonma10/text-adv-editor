import _ from 'lodash';


import * as types from '../actions/tree-action-types';

//const initialState = {};

const initialState = {
    isFetching: false,
    payload: [],
    tree: {},
    config: [],
    messages: [],
    verbs: [],
    nouns: []
}

export default function treeReducer(state = initialState, action){

    switch (action.type){
        case types.REQUEST_JSON:
            return Object.assign({}, state, {
                tree: JSON.parse(requestData(action.url))
            });
            break;

        case types.REQUEST_DATA:
            return Object.assign({}, state, {
                isFetching: true
            });
            break;

        case types.GET_CONFIG:
            return _.clone(state.config);
            break;

        case types.SET_CONFIG:
            return Object.assign({}, state, {
                config: action.payload
            });
            break;

        default:
            console.log('treeReducer default', action)
            return state;
    }
}

