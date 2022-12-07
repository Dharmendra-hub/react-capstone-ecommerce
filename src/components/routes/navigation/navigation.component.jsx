import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";

import { useSelector } from 'react-redux';

import CartIcon from '../../../components/cart-icon/cart-icon.component';
import CartDropdown from "../../cart-dropdown/cart-dropdown.component";

//import { UserContext } from "../../../context/user.context";
import { CartContext } from "../../../context/cart.context";

import { signOutUser } from "../../../utils/firebase/firebase.utils";

import { NavigationContainer, NavLinks, Navlink, LogoContainer } from './navigation.styles.jsx';
import { ReactComponent as CrwnLogo } from '../../../assets/crown.svg';



const Navigation = () => {
    //Here we are accessing the actual value NOT setting
    //We set the value using the setter function where we want to set the value
    //const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    const { currentUser } = useSelector((state) => {
        console.log(state.users, '<----')
        return state.users;
    });

    console.log('currentUser=>>>>>>>>', currentUser);

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className="logo" />
                </LogoContainer>

                <NavLinks>
                    <Navlink className="nav-link" to='/shop'>
                        Shop
                    </Navlink>
                    {currentUser ? (<Navlink as='span' className="nav-link" onClick={signOutUser}>Sign Out</Navlink>) : (
                        <Navlink className="nav-link" to='/auth'>
                            Sign In
                        </Navlink>
                    )}
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
}
export default Navigation;