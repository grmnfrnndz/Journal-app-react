import {signInWithEmailAndPassword, updateProfile, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {FirebaseAuth} from "./config.js";


const googleProvider =  new GoogleAuthProvider();


export const signinWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credencials = GoogleAuthProvider.credentialFromResult(result);
        // console.log({credencials});

        const {displayName, email, photoURL, uid} = result.user;

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }


    } catch (err) {
        const errorCode = err.code;
        const errorMessage = err.message;
        // The email of the user's account used.
        const email = err.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(err);


        console.log(err);
        return {
            ok: false,
            errorMessage
        }
    }


}

export const registerUserWithEmailPassword = async ({email, password, displayName}) => {
    try {
        const result = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const {uid, photoURL} = result.user;

        await updateProfile(FirebaseAuth.currentUser, {
            displayName
        });
        console.log(result);

        return {
            ok: true, uid, photoURL, email, displayName
        }

    } catch (err) {
        // console.log(err);
        return {ok: false, errorMessage: err.message}
    }
}


export const signInWithEmailPassword = async ({email, password}) => {
    try {
        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password)

        const {displayName, photoURL, uid} = result.user;

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }


    } catch (err) {
        return {ok: false, errorMessage: err.message}
    }
}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
}