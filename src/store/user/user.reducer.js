//Using this to prevent error
export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const INITIAL_STATE = {
    currentUser: null
}

/**
 * Reducer Way
 * @accepts state, action
 * Proviing initial state 
 */
const userReducer = (state = INITIAL_STATE, action) => {
    console.log('dispatched_userReducer');
    console.log(action);
    const { type, payload } = action;

    switch (type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: payload
            }
        default:
            return state;
    }
}
