import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase.utils";

import FormInput from '../form-input/form-input.component';

import './sign-up-form.styles.scss';

import Button from "../button/button.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);

    const { displayName, email, password, confirmPassword } = formFields;

    console.log('run');

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            //Destructure user directly from the response
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            //console.log('displayName', displayName);
            //Pass dispay name

            await createUserDocumentFromAuth(user, { displayName });

            //Reset form fields
            resetFormFields();
        }
        catch (error) {
            if (error.code === 'auth/weak-password') {
                alert('Password should be at least 6 characters');
            }
            else if (error.code === 'auth/email-already-in-use') {
                alert('Email already exists');
            }
            else if (error.code === 'auth/popup-closed-by-user') {
                alert('Auth Popup Closed');
            }
            else {
                console.log(error);
            }
        }
    }

    //creating a generic function to handle all inputs at a time
    const handleChange = (event) => {
        const { name, value } = event.target;
        //Keeping the same names

        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have account</h2>
            <span>Sign up with your email and passoword</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text"
                    value={displayName}
                    required
                    name="displayName"
                    onChange={handleChange}
                />

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

                <FormInput
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    required
                    name="confirmPassword"
                    onChange={handleChange}
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}
export default SignUpForm;