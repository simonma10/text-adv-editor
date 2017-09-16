import AppStateReducer from './app-state-reducer';

import * as types from '../actions/app-state-action-types';
const initialState = {
    status: "loading"
};


describe('app-state reducer', () => {
    it('should return the initial state', () => {
        expect(AppStateReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle GET_STATUS', () => {
        expect(
            AppStateReducer(undefined, {
                type: types.GET_STATUS
            })
        ).toEqual("loading")
    });

    it('should handle SET_STATUS', () => {
        expect(
            AppStateReducer(undefined, {
                type: types.SET_STATUS,
                payload: "test"
            })
        ).toEqual({"status": "test"})
    });

})