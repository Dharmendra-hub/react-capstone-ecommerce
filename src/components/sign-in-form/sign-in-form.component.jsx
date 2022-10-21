import { useState } from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase.utils";

import FormInput from '../form-input/form-input.component';

import './sign-in-form.styles.scss';

import Button from "../button/button.component";

const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);

    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    //Async Await 
    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        return userDocRef;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();
        }
        catch (error) {
            console.log(error);
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect Password for email');
                    break;
                case 'auth/user-not-found':
                    alert('User with this Email not found');
                    break;
                default:
                    console.log(error);
            }
            // if (error.code === "auth/wrong-password") {
            //     alert('Incorrect Password for email')
            // }

        }
    }

    //creating a generic function to handle all inputs at a time
    const handleChange = (event) => {
        const { name, value } = event.target;
        //Keeping the same names

        setFormFields({ ...formFields, [name]: value });
    }

    console.log(formFields);

    return (
        <div className="sign-up-container">
            <h2>Already have an account ?</h2>
            <span>Sign up with your email and passoword</span>
            <form onSubmit={handleSubmit}>


                <FormInput
                    label="Email"
                    type="email"
                    value={email}
                    required
                    name="email"
                    onChange={handleChange}
                />

                <FormInput
                    label="Password"
                    type="password"
                    value={password}
                    required
                    name="password"
                    onChange={handleChange}
                />

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={'google'} onClick={signInWithGoogle}>Google sign in</Button>
                    {/* Error was occuring as this google button was trigerring submit so changed that to button type button */}
                </div>

            </form>
        </div>
    )
}
export default SignInForm;