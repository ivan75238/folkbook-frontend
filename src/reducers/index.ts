import {combineReducers} from 'redux';
import { reducer as modal } from 'redux-modal';

import {app} from './app';
import {books} from './books';

const rootReducer = combineReducers({
    modal,
    app,
    books,
});


export {rootReducer};

