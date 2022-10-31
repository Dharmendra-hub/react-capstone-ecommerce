import { createContext, useEffect, useReducer } from 'react';

import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils'

import { createAction } from '../utils/reducer/reducer.utils';
//As the actual value you want to access
/**
 * Here we build the contest for the provider, where we set the initial context values of the provider. Where in prividerwe use the initial values using the initial state using useState hook or event we can use the useEffect hook to get the value.
 * So in this example we are using the value of variable which holds the value to null and the setter function also pointing to the function which returns null
 * Its always preffered to use NULL as 
 */
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});



export const UserProvider = ({ children }) => {
    //const [currentUser, setCurrentUser] = useState(null);
    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
    const { currentUser } = state; //THIS CAN BE WRITTEN IN ONE LINE LIKE [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

    console.log(currentUser);

    const setCurrentUser = (user) => {
        // dispatch({
        //     type: USER_ACTION_TYPES.SET_CURRENT_USER,
        //     payload: user
        // });

        //Using common utility
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    }

    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        //This watcher function we need to handle that we need to determine the wether to stop listening to prevent memory leaks
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);


    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

