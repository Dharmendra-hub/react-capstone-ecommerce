// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD3eWHvV5VuKlQkT0tvQ5iwXRSS_joUffA",
    authDomain: "clothing-ecomm-dev-db.firebaseapp.com",
    projectId: "clothing-ecomm-dev-db",
    storageBucket: "clothing-ecomm-dev-db.appspot.com",
    messagingSenderId: "986325285082",
    appId: "1:986325285082:web:c7ce2161bb2381e1a94de3",
    measurementId: "G-59HWNR4K46"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(firebaseApp);


//you can create as many as providers in the firebase app like Facebook, Github etc here we are using google provider
const googleprovider = new GoogleAuthProvider();
googleprovider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
//popup
export const signInWithGooglePopup = () => signInWithPopup(auth, googleprovider);
//redirect
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleprovider);

export const db = getFirestore();


//Upload data to Firestore
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
};


//get collections adata from firestore
export const getCategoriesAndDocuments = async () => {
    const collectionref = collection(db, 'categories');

    const q = query(collectionref);
    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((accumulator, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        accumulator[title.toLowerCase()] = items;
        return accumulator;
    }, {});

    return categoryMap;
}


// Email sign up functinaity is merged as in email and password fiebas dont have dispalay name, and if iit will have it will override - dig deep to chck this functionality - and it will not allow to create user with same name
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = []) => {
    //Extra Protection
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    //console.log(userDocRef);

    //get user data if or if not exists
    const userSnapshot = await getDoc(userDocRef);
    //console.log(userSnapshot);
    //console.log(userSnapshot.exists());

    //if user data does not exists
    //create/set 
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        // console.log(displayName,
        //     email,
        //     createdAt,
        //     ...additionalInformation, '<--');

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        }
        catch (error) {
            if (error.code === 'auth/weak-password') {
                alert('Password should be at least 6 characters');
            }
            else if (error.code === 'auth/email-already-in-use') {
                alert('Email already exists');
            }
            else {
                console.log('Error creating the user', error.message);
            }
        }
    }

    //if user data exists
    //return doc reference
    return userDocRef;

}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    try {
        return await createUserWithEmailAndPassword(auth, email, password);
    }
    catch (error) {
        if (error.code === 'auth/weak-password') {
            alert('Password should be at least 6 characters');
        }
        else if (error.code === 'auth/email-already-in-use') {
            alert('Email already exists');
        }
        else {
            console.log('Error creating the user', error.message);
        }
    }
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

//Firebase signOut returns promise so we need to make this async await
export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
