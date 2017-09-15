import { combineReducers } from 'redux';

import AppStateReducer from './app-state-reducer';
import TreeReducer from './tree-reducer';

const rootReducer = combineReducers({
    appState: AppStateReducer,
    tree: TreeReducer
});

export default rootReducer;