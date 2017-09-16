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
    })

})