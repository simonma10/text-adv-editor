import * as types from './tree-action-types';

export function requestJson (url) {
    return {
        type: types.REQUEST_JSON,
        payload: url
    }
}