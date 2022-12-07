import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from "react-router-dom";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth
} from './utils/firebase/firebase.utils';

import Home from "./components/routes/home/home.component";
import Navigation from "./components/routes/navigation/navigation.component";
import Authentication from "./components/routes/authentication/authentication.component";
import Shop from "./components/routes/shop/shop.component";
import Checkout from "./components/routes/checkout/checkout.component";

//import { setCurrentUser } from './store/user/user.action';

import { setLoginUser, setLogOutUser } from './store/features/user.features.slice';


const App = () => {

  //access the existing state by useSelector
  // const user = useSelector((state) => {
  //   console.log('existing_state', selectUser);
  //   console.log('exis_state', state);
  // });
  // console.log('user', user);

  const dispatch = useDispatch();


  useEffect(() => {
    //This watcher function we need to handle that we need to determine the wether to stop listening to prevent memory leaks
    const unsubscribe = onAuthStateChangedListener((user) => {
      //console.log('ussr', user);

      if (user) {
        createUserDocumentFromAuth(user);
        dispatch(setLoginUser(user));
      }
      else {
        dispatch(setLogOutUser());
      }
      //dispatch(setCurrentUser(user));
      //dispatch(setLogOutUser());
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
