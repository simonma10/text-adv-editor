import _ from 'lodash';

import * as types from '../actions/tree-action-types';


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
            //console.log('reducer: request');
            return Object.assign({}, state, {
                status: 'loading'
            });
            break;

        case types.SAVE_LIST_ITEM_DETAILS:

            //console.log('tree reducer', action.payload);
            data = action.payload;

            //--- make strings numeric
            if(_.isInteger(_.parseInt(data.newValue))){
                data.newValue = _.parseInt(data.newValue);
            }

            //--- if new key is empty, copy old key because we are updating the value only
            if(data.newIndex === ''){
                data.newIndex = data.oldIndex;
            }

            //--- convert list name to lower case and clone the list
            data.listName = data.listName.toLowerCase();
            let clonedList = _.clone(state[data.listName]);

            //--- Update logic: add, update key/both, update value
            if (data.oldIndex === ''){
                //--- if oldIndex is empty, add a new item
                clonedList[data.newIndex] = data.newValue;

            } else if (data.oldIndex !== data.newIndex) {
                //--- if oldIndex is different to newIndex, update item by deleting and adding new
                delete clonedList[data.oldIndex];
                if(data.newValue === ''){
                    //--- if newValue is empty, copy the old value
                    clonedList[data.newIndex] = data.oldValue;
                } else {
                    //--- otherwise copy both newIndex and newValue
                    clonedList[data.newIndex] = data.newValue;
                }


            } else {
                //---otherwise, update the existing item
                clonedList[data.oldIndex] = data.newValue;
            }

            return Object.assign({}, state, {
                [data.listName]: clonedList
            });
            break;

        case types.DELETE_LIST_ITEM:
            //console.log('tree reducer', action.payload);
            data = action.payload;

            //--- convert list name to lower case
            data.listName = data.listName.toLowerCase();

            //--- clone the list object and delete the item that matches data.itemKey
            clonedList = _.clone(state[data.listName]);
            //console.log(clonedList);
            delete clonedList[data.itemKey]

            return Object.assign({}, state, {
                [data.listName]: clonedList
            });

            break;

        case types.SAVE_LOCATION_DETAILS:
            console.log('save location details');
            return state;
            break;

        case types.DELETE_LOCATION:
            console.log('delete location');
            return state;
            break;

        default:
            return state;

    }
}

/*
function loadData(url){
    return fetch(url).then(response => {
        console.log(response.json);
        return response.json();
    }).catch(error => {
        return error;
    });
}*/
