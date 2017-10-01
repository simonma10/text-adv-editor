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
            //console.log('save location details');
            data = action.payload;

            //--- make id numeric
            if(_.isInteger(_.parseInt(data.newId))){
                data.newId = _.parseInt(data.newId);
            }

            //TODO: check for duplicate id

            //--- convert list name to lower case and clone the list
            data.listName = data.listName.toLowerCase();
            clonedList = _.clone(state[data.listName]);

            let clonedLocation = _.find(clonedList, {'id':data.oldId});


            if (_.isUndefined(clonedLocation)){
                //--- if undefined, assume it's a new location
                clonedLocation = {};
                clonedList.push(clonedLocation);
            }

            console.log('tree-reducer::clonedLocation = ', clonedLocation);

            clonedLocation.id = data.newId;
            clonedLocation.visited = data.newVisited;
            clonedLocation.name = data.newName;
            clonedLocation.description = data.newDescription;
            clonedLocation.exits = data.newExits;

            return Object.assign({}, state, {
                [data.listName]: clonedList
            });
            break;

        case types.DELETE_LOCATION:
            console.log('delete location');
            data = action.payload;

            //--- convert list name to lower case
            data.listName = data.listName.toLowerCase();

            //--- clone the list object and find the index of the item to be deleted
            clonedList = _.clone(state[data.listName]);
            let index = _.findIndex(clonedList, { 'id': data.id });

            //--- if index is -1, the item wasn't found.  Otherwise, remove 1 item at index
            if (index > -1){
                clonedList.splice(index, 1);
            }

            return Object.assign({}, state, {
                [data.listName]: clonedList
            });

            break;


        case types.SAVE_ITEM_DETAILS:
            //console.log('save item details');
            data = action.payload;

            //--- make id numeric
            if(_.isInteger(_.parseInt(data.newId))){
                data.newId = _.parseInt(data.newId);
            }

            //TODO: check for duplicate id

            //--- convert list name to lower case and clone the list
            data.listName = data.listName.toLowerCase();
            clonedList = _.clone(state[data.listName]);

            let clonedItem = _.find(clonedList, {'id':data.oldId});


            if (_.isUndefined(clonedItem)){
                //--- if undefined, assume it's a new item
                clonedItem = {};
                clonedList.push(clonedItem);
            }

            console.log('tree-reducer::clonedItem = ', clonedItem);

            clonedItem.id = data.newId;
            clonedItem.location = data.newLocation;
            clonedItem.name = data.newName;
            clonedItem.description = data.newDescription;
            clonedItem.shortdescription = data.newShortdescription;

            return Object.assign({}, state, {
                [data.listName]: clonedList
            });
            break;

        case types.DELETE_ITEM:
            console.log('delete item');
            data = action.payload;

            //--- convert list name to lower case
            data.listName = data.listName.toLowerCase();

            //--- clone the list object and find the index of the item to be deleted
            clonedList = _.clone(state[data.listName]);
            index = _.findIndex(clonedList, { 'id': data.id });

            //--- if index is -1, the item wasn't found.  Otherwise, remove 1 item at index
            if (index > -1){
                clonedList.splice(index, 1);
            }

            return Object.assign({}, state, {
                [data.listName]: clonedList
            });

            break;

        case types.SAVE_CONDITION_DETAILS:
            data = action.payload;
            //--- make id numeric
            if(_.isInteger(_.parseInt(data.newId))){
                data.newId = _.parseInt(data.newId);
            }

            //TODO: check for duplicate id

            //--- convert list name to lower case and clone the list
            data.listName = data.listName.toLowerCase();
            clonedList = _.clone(state[data.listName]);

            let clonedCondition = _.find(clonedList, {'id':data.oldId});


            if (_.isUndefined(clonedCondition)){
                //--- if undefined, assume it's a new item
                clonedCondition = {};
                clonedList.push(clonedCondition);
            }

            console.log('tree-reducer::clonedCondition = ', clonedCondition);

            clonedCondition.id = data.newId;
            clonedCondition.tests = data.newTests;
            clonedCondition.actions = data.newActions;

            return Object.assign({}, state, {
                [data.listName]: clonedList
            });
            break;

        case types.DELETE_CONDITION:
            console.log('delete Condition');
            data = action.payload;

            //--- convert list name to lower case
            data.listName = data.listName.toLowerCase();

            //--- clone the list object and find the index of the item to be deleted
            clonedList = _.clone(state[data.listName]);
            index = _.findIndex(clonedList, { 'id': data.id });

            //--- if index is -1, the item wasn't found.  Otherwise, remove 1 item at index
            if (index > -1){
                clonedList.splice(index, 1);
            }

            return Object.assign({}, state, {
                [data.listName]: clonedList
            });

            break;

        default:
            return state;

    }
}

