import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from '../../../utils/firebase.utils';

import SignUpForm from '../../sign-up-form/sign-up-form.component';

const SignIn = () => {

    useEffect(() => {
        async function getGoogleRedirectResult() {
            const response = await getRedirectResult(auth);
            //console.log(response);
            if (response) {
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }
        }
        getGoogleRedirectResult();
    }, []);


    //Async Await 
    const logGoogleUserPopup = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        return userDocRef;
    }

    // const logGoogleRedirectUser = async () => {
    //     const { user } = await signInWithGoogleRedirect();
    //     //const userDocRef = await createUserDocumentFromAuth(user);
    //     //return userDocRef;
    //     console.log(user);
    // }

    return (
        <div>
            <h1>Sign in</h1>
            <button onClick={logGoogleUserPopup}>Sign in with Google</button>
            <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
            <SignUpForm />
        </div>
    )
}
export default SignIn;