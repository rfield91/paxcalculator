import { createBrowserHistory, createMemoryHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware, LOCATION_CHANGE } from 'connected-react-router';
import { reduxBatch } from '@manaflair/redux-batch';
import thunkMiddleware from 'redux-thunk';
import queryString from 'query-string';
import { isIOS } from 'react-device-detect';

import createRootReducer from './redux';
import { saveState, loadState } from './redux/localstorage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

var historyType = createBrowserHistory;
if (window.navigator.standalone && isIOS) {
    historyType = createMemoryHistory;
}

export default (initialState = {}, historyOptions) => {
    const persistedState = loadState();

    const history = historyType({
        keyLength: 8,
        alwaysEnableState: true,
        ...historyOptions,
    });

    const store = createStore(
        createRootReducer(history),
        { ...persistedState, ...initialState },
        composeEnhancers(
            applyMiddleware(
                thunkMiddleware,
                routerMiddleware(history),
                parseRouterLocationSearch
            ),
            reduxBatch
        )
    );

    store.subscribe(() => {
        saveState(store.getState());
    });

    return {
        store,
        history,
    };
};

const parseRouterLocationSearch = (store) => (next) => (action) => {
    const prevState = store.getState();
    if (
        action.type === LOCATION_CHANGE &&
        action.payload &&
        action.payload.location
    ) {
        action.payload.location.query = queryString.parse(
            action.payload.location.search
        );
    }

    return next(action);
};
