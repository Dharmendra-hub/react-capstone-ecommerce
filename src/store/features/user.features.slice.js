//import { useEffect } from 'react';
import { createSlice } from '@reduxjs/toolkit';

//import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils'

//import { setCurrentUser } from '../user/user.action';


const INITIAL_STATE = {
    loading: 'idle',
    currentUser: null
}


const userSlice = createSlice({
    name: 'users',
    initialState: INITIAL_STATE,
    reducers: {
        setLoginUser: (state, action) => {
            state.currentUser = action.payload
        },
        setLogOutUser: (state) => {
            state.currentUser = null
        }
    }
});


//https://blog.gmagnenat.co/user-authentication-and-persistence-firebase-9-react-redux-toolkit
//https://stackoverflow.com/questions/73274467/how-to-set-authentication-status-with-redux-toolkit-and-firebase-using-onauthsta

export const { setLoginUser, setLogOutUser } = userSlice.actions;

//Selectors
export const selectUser = (state) => state.currentUser;

export default userSlice.reducer;



