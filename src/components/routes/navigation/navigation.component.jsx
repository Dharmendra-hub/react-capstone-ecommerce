import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

import './navigation.styles.scss';
import { ReactComponent as CrwnLogo } from '../../../assets/crown.svg';


const Navigation = () => {
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <div><CrwnLogo /></div>
                </Link>

                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        Shops
                    </Link>
                    <Link className="nav-link" to='/sign-in'>
                        Sign In
                    </Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}
export default Navigation;