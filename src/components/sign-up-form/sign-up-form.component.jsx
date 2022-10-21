import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase.utils";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);

    const { displayName, email, password, confirmPassword } = formFields;

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
            console.log('displayName', displayName)
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

    console.log(formFields);

    return (
        <div>
            <h1>Sign up with your email and passoword</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input type="text" value={displayName} required name="displayName" onChange={handleChange} />

                <label>Email</label>
                <input type="email" value={email} required name="email" onChange={handleChange} />

                <label>Password</label>
                <input type="password" value={password} required name="password" onChange={handleChange} />

                <label>Confirm Password</label>
                <input type="password" value={confirmPassword} required name="confirmPassword" onChange={handleChange} />

                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}
export default SignUpForm;