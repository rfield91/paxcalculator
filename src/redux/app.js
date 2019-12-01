import produce from 'immer';
import { uniqueId, sortBy, filter } from 'lodash-es';

const initialState = {
    lastPaxClass: '',
    laps: [
        // {
        //     id: uniqueId('lap'),
        //     time: '21.300',
        //     paxClass: 'SS',
        //     date: new Date(
        //         'Sat Nov 30 2019 13:24:18 GMT-0500 (Eastern Standard Time)'
        //     ).toString(),
        // },
        // {
        //     id: uniqueId('lap'),
        //     time: '24.010',
        //     paxClass: 'SS',
        //     date: new Date(
        //         'Sat Nov 30 2019 13:25:18 GMT-0500 (Eastern Standard Time)'
        //     ).toString(),
        // },
        // {
        //     id: uniqueId('lap'),
        //     time: '30.000',
        //     paxClass: 'SS',
        //     date: new Date(
        //         'Fri Nov 29 2019 13:25:18 GMT-0500 (Eastern Standard Time)'
        //     ).toString(),
        // },
        // {
        //     id: uniqueId('lap'),
        //     time: '30.000',
        //     paxClass: 'SS',
        //     date: new Date(
        //         'Wed Nov 20 2019 13:25:18 GMT-0500 (Eastern Standard Time)'
        //     ).toString(),
        // },
    ],
};

const NS = '@app/';

export const LAST_PAX_CLASS_CHANGED = NS + 'LAST_PAX_CLASS_CHANGED';
export const setLastPaxClass = (lastPaxClass) => {
    return {
        type: LAST_PAX_CLASS_CHANGED,
        payload: {
            lastPaxClass,
        },
    };
};

export const LAPS_CHANGED = NS + 'LAPS_CHANGED';
export const setLaps = (laps) => {
    return {
        type: LAPS_CHANGED,
        payload: {
            laps,
        },
    };
};

export const addLap = (lap) => (dispatch, getState) => {
    const {
        app: { laps },
    } = getState();

    const nextLap = {
        id: uniqueId('lap') + new Date().getTime(),
        date: new Date().toString(),
        ...lap,
        time: parseFloat(lap.time).toFixed(3),
    };

    const nextLaps = produce(laps, (draft) => {
        draft.push(nextLap);
    });
    dispatch(setLastPaxClass(nextLap.paxClass));
    dispatch(setLaps(nextLaps));
};

export const DELETE_LAP = NS + 'DELETE_LAP';
export const deleteLap = (lapId) => {
    return {
        type: DELETE_LAP,
        payload: {
            lapId,
        },
    };
};

export const DELETE_ALL_LAPS = NS + 'DELETE_ALL_LAPS';
export const deleteAllLaps = () => {
    return {
        type: DELETE_ALL_LAPS,
    };
};

export default (state = initialState, { type, payload }) =>
    produce(state, (nextState) => {
        if (!nextState.hydrated) {
            Object.assign(nextState, {
                ...initialState,
                ...nextState,
                hydrated: true,
            });
        }
        switch (type) {
            case LAST_PAX_CLASS_CHANGED:
                nextState.lastPaxClass = payload.lastPaxClass;
                break;
            case DELETE_ALL_LAPS:
                nextState.laps = [];
                break;
            case LAPS_CHANGED:
                nextState.laps = sortBy(payload.laps, ({ date }) =>
                    new Date(date).getTime()
                ).reverse();
                break;
            case DELETE_LAP:
                nextState.laps = filter(
                    nextState.laps,
                    ({ id }) => id !== payload.lapId
                );
                break;
        }
    });
