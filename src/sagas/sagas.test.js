import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers/all-reducers';
import rootSaga from './sagas';

import AppStateReducer from '../reducers/app-state-reducer';
import * as types from '../actions/app-state-action-types';
import { helloSaga, getAppStatus, setAppStatus } from './sagas';

import { put, call } from 'redux-saga/effects';






describe('sagas', () => {


    it('should return hello world from helloSaga', () => {
        //setup();
        const gen = helloSaga();

        expect (gen.next()).toEqual(
            {
                "done": false,
                "value": "helloSaga"
            });

        expect (gen.next()).toEqual(
            {
                "done": true,
                "value": undefined
            });

    });
/*
    it('should return status text from from getAppStatus', () => {
        //setup();
        const gen = getAppStatus();
        expect (gen.next().value).toEqual(put ({type: types.GET_STATUS, value: "loading"}));

    });*/

    it('should set status text with setAppStatus', () => {
        setup();
        const gen = setAppStatus("saga was here");
        expect (gen.next().value).toEqual(put ({type: types.SET_STATUS, value: "saga was here"}));

    });



});

/*

function setup(){
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        rootReducer, applyMiddleware(sagaMiddleware)
    );

    sagaMiddleware.run(rootSaga);


}*/
