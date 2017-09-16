import * as actions from './app-state-actions';
import * as types from './app-state-action-types';

describe('actions', () => {
    it('should set app status', () => {
        const payload = 'test';
        const expectedAction = {
            type: types.SET_STATUS,
            payload
        };
        expect(actions.setStatus(payload)).toEqual(expectedAction);
    });

    it('should get app status', () => {
        const payload = 'test'
        actions.setStatus(payload);
        const expectedAction = {
            type: types.GET_STATUS
        };

        expect(actions.getStatus()).toEqual(expectedAction);

    })

})