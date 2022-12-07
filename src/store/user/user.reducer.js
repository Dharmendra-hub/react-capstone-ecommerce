import { USER_ACTION_TYPES } from './user.types';

const INITIAL_STATE = {
    currentUser: null
}

/**
 * Reducer Way
 * @accepts state, action
 * Proviing initial state 
 */
export const userReducer = (state = INITIAL_STATE, action) => {
    console.log('dispatched_userReducer');
    console.log(action);
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            return state;
    }
}
