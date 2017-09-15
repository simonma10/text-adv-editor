import * as types from './tree-action-types';

export function requestJson (url) {
    console.log('request json');
    return {
        type: types.REQUEST_JSON,
        payload: url
    }
}