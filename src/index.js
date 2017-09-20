import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import App from './components/app-component';
import rootReducer from './reducers/all-reducers';



//========================================================================================
// Create redux store using thunk middleware & Chrome devToolsExtension
//
//========================================================================================
const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension && window.devToolsExtension()
    )
);

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