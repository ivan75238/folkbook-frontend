import {createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {rootReducer} from "../reducers";

const store = createStore(
    rootReducer,
    composeWithDevTools()
);

export {store};

// eslint-disable-next-line no-undef
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch