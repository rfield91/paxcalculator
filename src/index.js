import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { LastLocationProvider } from 'react-router-last-location';
import App from './components/app';
import createStore from './store';
import { isIOS, osName } from 'react-device-detect';
import './styles/index.less';

document.documentElement.classList.add(`platform-${osName.toLowerCase()}`);
const { store, history } = createStore(global.__INITIAL_STATE__, {
    basename: global.basename,
});

const getWindowHeight = () => {
    return isIOS ? window.innerHeight - 1 : window.innerHeight;
};

let previousHeight = getWindowHeight();
const handleResize = () => {
    previousHeight = getWindowHeight();
    if ('standalone' in window.navigator && window.navigator.standalone) {
        document.documentElement.style.setProperty('--vh', `1vh`);
    } else {
        const vh = getWindowHeight() * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
};
window.addEventListener('resize', handleResize);
window.addEventListener('orientationchange', handleResize);

setInterval(() => {
    if (getWindowHeight() !== previousHeight) {
        handleResize();
    }
}, 500);

let visibilityChangeEventName = null;
if (typeof document.hidden !== 'undefined') {
    // Opera 12.10 and Firefox 18 and later support
    visibilityChangeEventName = 'visibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
    visibilityChangeEventName = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
    visibilityChangeEventName = 'webkitvisibilitychange';
}
if (visibilityChangeEventName) {
    document.addEventListener(visibilityChangeEventName, handleResize, false);
}
handleResize();

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <LastLocationProvider>
                <App />
            </LastLocationProvider>
        </ConnectedRouter>
    </Provider>,
    document.querySelector('#root')
);
