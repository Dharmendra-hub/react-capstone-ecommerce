//import { userReducer } from '../store/user/user.reducer';
import userReducer from './features/user.features.slice';

//Passing arguments to combine reducers as Object
export const rootReducer = {
    users: userReducer
};