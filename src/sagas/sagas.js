import { delay } from 'redux-saga'
import { put, takeEvery, all, call } from 'redux-saga/effects'
import * as appStateActionTypes from '../actions/app-state-action-types';
import * as appStateActions from '../actions/app-state-actions';
import AppStateReducer from '../reducers/app-state-reducer';


export function* helloSaga() {
    yield "helloSaga";
}

export function* getAppStatus() {
    const status = AppStateReducer({}, getAppStatus);

    yield put( { type:  appStateActionTypes.GET_STATUS, value: status } );

}

export function* watchGetAppStatus() {
    yield takeEvery(appStateActionTypes.GET_STATUS, getAppStatus);
}

export function* setAppStatus(value) {

    yield put( { type: appStateActionTypes.SET_STATUS,  value: value } );

}

export function* watchSetAppStatus() {
    yield takeEvery(appStateActionTypes.SET_STATUS, setAppStatus);
}




/*

export function* incrementAsync() {
    yield call(delay, 1000);
    yield put( { type: 'INCREMENT'} )
}

export function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}
*/


export default function* rootSaga() {
    yield all([
        helloSaga(),
        watchGetAppStatus(),
        watchSetAppStatus()
    ])
}