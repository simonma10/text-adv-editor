import * as types from './app-state-action-types';

export function setStatus (status) {
    return {
        type: types.SET_STATUS,
        payload: status
    }
}