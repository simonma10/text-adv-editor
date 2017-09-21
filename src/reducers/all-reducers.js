import { combineReducers } from 'redux';

import AppStateReducer from './app-state-reducer';
import TreeReducer from './tree-reducer';
import ModalReducer from './modal-reducer';

const rootReducer = combineReducers({
    appState: AppStateReducer,
    tree: TreeReducer,
    modal: ModalReducer
});

export default rootReducer;