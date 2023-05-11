import {authSlice, checkingCredentials, login, logout} from "../../../src/store/auth/authSlice";
import {authenticatedState, demoUser, initialState, notAuthenticatedState} from "../../fixtures/authFixtures.js";

describe('test on authSlice', function () {

    test('should be return initialstate and called auth', () => {
        const state = authSlice.reducer(initialState, {});
        expect(authSlice.name).toBe('auth');
        expect(state).toEqual(initialState);
    });

    test('should be authenticated', () => {
        // console.log(login(demoUser));

        const state = authSlice.reducer(initialState, login(demoUser));

        expect(state).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        });
    });

    test('should be user logout without args', () => {
        const state = authSlice.reducer(authenticatedState, logout({errorMessage: null}));

        expect(state).toEqual(notAuthenticatedState);

    })

    test('should be user logout with args', () => {

        const errorMessage = 'not valid data';

        const state = authSlice.reducer(authenticatedState, logout({errorMessage}));

        expect(state).toEqual({
            ...notAuthenticatedState,
            errorMessage
        });

    });

    test('should be change state to checking', () => {
       const state = authSlice.reducer( authenticatedState, checkingCredentials());
       expect(state.status).toBe('checking');
    });



});