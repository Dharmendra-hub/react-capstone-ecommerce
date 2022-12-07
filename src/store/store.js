import { configureStore } from '@reduxjs/toolkit'

import logger from 'redux-logger';

//root reducer
import { rootReducer } from './root-reducer';


//here middleware is composed using compose function, which enables the application of middleware here we can simply apply more middleware separated by comma
//const composedEnhancers = compose(applyMiddleware(...middleWares));

//configureStore takes 3 args
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
});

console.log('getState==>', store.getState())
