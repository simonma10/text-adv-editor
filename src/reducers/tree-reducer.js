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

        case types.SAVE_LIST_ITEM_DETAILS:

            //TODO: handle update of key.
            console.log('tree reducer', action.payload);
            data = action.payload;

            //--- make strings numeric
            if(_.isInteger(_.parseInt(data.newValue))){
                data.newValue = _.parseInt(data.newValue);
            }

            //--- key is the same or new key is empty therefore update value only
            if(data.oldIndex === data.newIndex || data.newIndex === ''){
                data.newIndex = data.oldIndex;
            }

            //--- convert list name to lower case
            data.listName = data.listName.toLowerCase();

            let clonedList = _.clone(state[data.listName]);


            //TODO: handle new item (when oldIndex is '')
            clonedList[data.oldIndex] = data.newValue;

            return Object.assign({}, state, {
                [data.listName]: clonedList
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