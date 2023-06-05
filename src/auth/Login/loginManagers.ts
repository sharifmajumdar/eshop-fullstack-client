// This component represents the firebase related tasks
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import firebaseConfig from './firebase.config';

// This function ensure the firebase initialization
export const initializeLoginFramewrok = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    else {
        firebase.app();
    }
}

interface UserType{
    displayName: string | null,
    photoURL: string | null,
    email: string | null
} 

// This function handle the login form using google account
export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
        .signInWithPopup(googleProvider)
        .then((res) => {
            const {displayName, photoURL, email}: any = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            };
            return email;
        }).catch((error) => {
            //const errorCode = error.code;
            //const errorMessage = error.Message;
            //const errorEmail = error.email;
            //const credential = error.credential;
            console.log(error);
        });
}