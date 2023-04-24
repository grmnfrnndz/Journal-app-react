import {checkingCredentials, login, logout} from "./";
import {logoutFirebase, registerUserWithEmailPassword, signInWithEmailPassword, signinWithGoogle} from "../../firebase/providers.js";
import {Logout} from "@mui/icons-material";
import {loadNotes} from "../../helpers/index.js";
import {clearNotesLogout, setNotes} from "../journal/index.js";


export const checkingAuthentication = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
    }
}


export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const result = await signinWithGoogle();

        if (!result.ok) return dispatch(logout(result));

        dispatch(login(result))

        console.log({result});
    }
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName});

        if (!ok) return dispatch(logout({errorMessage}));

        dispatch(login({uid, displayName, email, photoURL}));
    }
}


export const startEmailPasswordSignIn = ({email, password}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const result = await signInWithEmailPassword({email, password});

        if (!result.ok) return dispatch(logout(result));

        dispatch(login(result))
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase();
        dispatch(clearNotesLogout());
        dispatch(logout({}));
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth;

        if (!uid) throw new Error(`uid ${uid} not exist.`);

        const notes = await loadNotes(uid);

        dispatch(setNotes(notes));

    }
}