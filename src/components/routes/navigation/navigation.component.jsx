import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import CartIcon from '../../../components/cart-icon/cart-icon.component';
import CartDropdown from "../../cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../../context/user.context";
import { CartContext } from "../../../context/cart.context";

import { signOutUser } from "../../../utils/firebase.utils";

import './navigation.styles.scss';
import { ReactComponent as CrwnLogo } from '../../../assets/crown.svg';




const Navigation = () => {
    //Here we are accessing the actual value NOT setting
    //We set the value using the setter function where we want to set the value
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    console.log('currentUser',currentUser);
 
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <div><CrwnLogo /></div>
                </Link>

                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        Shop
                    </Link>
                    {currentUser ? (<span className="nav-link" onClick={signOutUser}>Sign Out</span>) : (
                        <Link className="nav-link" to='/auth'>
                            Sign In
                        </Link>
                    )}
                    <CartIcon/>
                </div>
                { isCartOpen && <CartDropdown/>}
            </div>
            <Outlet />
        </Fragment>
    )
}
export default Navigation;