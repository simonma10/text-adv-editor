import _ from 'lodash';

import * as types from '../actions/app-state-action-types';

const initialState = {
    status: "loading"
};

export default function appStateReducer(state = initialState, action){

    switch (action.type){
        case types.SET_STATUS:
            return Object.assign({}, state, {
                status: action.payload,
            });
            break;

        case types.GET_STATUS:
            return _.clone(state).status;
            break;

        default:
            console.log('appStateReducer default', action)
            return state;

    }
}