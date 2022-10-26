import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import { auth, createUserDocumentFromAuth } from '../../../utils/firebase.utils';

import SignUpForm from '../../sign-up-form/sign-up-form.component';
import SignInForm from '../../sign-in-form/sign-in-form.component';

import './authentication.styles.scss';

const Authentication = () => {

    useEffect(() => {
        async function getGoogleRedirectResult() {
            const response = await getRedirectResult(auth);
            //console.log(response);
            if (response) {
                await createUserDocumentFromAuth(response.user);
            }
        }
        getGoogleRedirectResult();
    }, []);

    // const logGoogleRedirectUser = async () => {
    //     const { user } = await signInWithGoogleRedirect();
    //     //const userDocRef = await createUserDocumentFromAuth(user);
    //     //return userDocRef;
    //     console.log(user);
    // }

    return (
        <div className='authentication-container'>
            <SignInForm />
            {/* <button onClick={logGoogleUserPopup}>Sign in with Google</button> */}
            {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
            <SignUpForm />
        </div>
    )
}
export default Authentication;