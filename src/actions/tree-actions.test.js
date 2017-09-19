import * as actions from './tree-actions';
import * as types from './tree-action-types';

describe('actions', () => {
    it('should request json', () => {
        const payload = 'data/globals.json'
        const expectedAction = {
            type: types.REQUEST_JSON,
            payload
        }
        expect(actions.requestJson(payload)).toEqual(expectedAction);
    });

    it('should request data', () => {
        const url = 'data/globals.json'
        const expectedAction = {
            type: types.REQUEST_DATA
        }
        expect(actions.requestData(url)).toEqual(expectedAction);
    });

    it('should receive data', () => {
        const payload = 'data/globals.json'
        const expectedAction = {
            type: types.REQUEST_JSON,
            payload
        }
        expect(actions.receiveData(payload)).toEqual(expectedAction);
    });


})