import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { UserContext } from "../../../context/user.context";

import { signOutUser } from "../../../utils/firebase.utils";

import './navigation.styles.scss';
import { ReactComponent as CrwnLogo } from '../../../assets/crown.svg';




const Navigation = () => {
    //Here we are accessing the actual value NOT setting
    //We set the value using the setter function where we want to set the value
    const { currentUser,setCurrentUser } = useContext(UserContext);
    console.log(currentUser);

    //as we need to handle both case of context update and sign out click
    const signOutHandler = async () => {
        await signOutUser();
        setCurrentUser(null);
    }

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
                    {currentUser ? (<span className="nav-link" onClick={signOutHandler}>Sign Out</span>) : (
                        <Link className="nav-link" to='/auth'>
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}
export default Navigation;