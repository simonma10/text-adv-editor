import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
//import createSagaMiddleware from 'redux-saga';

import App from './components/app-component';
import Tree from './components/sortable-tree-component';
import rootReducer from './reducers/all-reducers';
//import rootSaga from './sagas/sagas';


//========================================================================================
// Create redux store using thunk middleware & Chrome devToolsExtension
//
//========================================================================================
//const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension && window.devToolsExtension()
    )
);

//sagaMiddleware.run(rootSaga);

//========================================================================================
// Render app
//
//========================================================================================
ReactDOM.render(
    <Provider store={store}>
        <div>
            <App/>
        </div>
    </Provider>
    , document.querySelector('.container')

);