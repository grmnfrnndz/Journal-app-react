import React, {useEffect} from 'react';
import {onAuthStateChanged} from "firebase/auth";
import {useDispatch, useSelector} from "react-redux";

import {FirebaseAuth} from "../firebase/config.js";
import {login, logout, startLoadingNotes} from "../store/auth/index.js";

export const UseCheckAuth = () => {
    const {status} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(
        () => {

            onAuthStateChanged(FirebaseAuth, async (user) => {
                if (!user) return dispatch(logout());

                const {uid, displayName, email, photoURL} = user;

                dispatch(login({uid, displayName, email, photoURL}));
                dispatch(startLoadingNotes());
            });

        },
        []
    );

    return status;
}