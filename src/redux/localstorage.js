import { pick } from 'lodash';

const CACHE_KEY = 'paxcalculator';

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem(CACHE_KEY);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state = {}) => {
    try {
        const { app } = state;
        if (app) {
            const serializedState = JSON.stringify({
                app: pick(app, ['laps', 'lastPaxClass']),
            });
            localStorage.setItem(CACHE_KEY, serializedState);
        }
    } catch (err) {}
};
