import {logoutFirebase, signInWithEmailPassword, signinWithGoogle} from "../../../src/firebase/providers.js";
import {checkingAuthentication, startEmailPasswordSignIn, startGoogleSignIn, startLogout} from "../../../src/store/auth/thunks.js";
import {checkingCredentials, login, logout} from "../../../src/store/auth/index.js";
import {demoUser} from "../../fixtures/authFixtures.js";
import {clearNotesLogout} from "../../../src/store/journal/journalSlice.js";

jest.mock("../../../src/firebase/providers.js");

describe('test on auth thunks', function () {
    const dispatch = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('should be invocked checkingCredentials', async () => {


        await checkingAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());

    });

    test('should be startGoogleSignIn call to checkingCredentials and login success', async () => {

        const loginData = {ok: true, ...demoUser};
        await signinWithGoogle.mockResolvedValue(loginData);

        // thunks
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));

    });

    test('should be startGoogleSignIn call to checkingCredentials and logout error', async () => {

        const loginData = {ok: false, errorMessage: 'Error Google'};
        await signinWithGoogle.mockResolvedValue(loginData);

        // thunks
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData));

    });

    test('startEmailPasswordSignIn call to checkingCredentials and login success', async () => {
        const loginData = {ok: true, ...demoUser};
        const formData = {email:demoUser, password: '123456'};
        await signInWithEmailPassword.mockResolvedValue(loginData);

        await startEmailPasswordSignIn(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));


    });

    test('startEmailPasswordSignIn call to checkingCredentials and logout error', async () => {
        const loginData = {ok: false, errorMessage: 'Error XXX'};
        const formData = {email:demoUser, password: '123456'};
        await signInWithEmailPassword.mockResolvedValue(loginData);

        await startEmailPasswordSignIn(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData));
    });

    test('startLogout call to logoutFirebase and clearNotesLogout and logout success', async () => {

        await startLogout()(dispatch);

        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
        expect(dispatch).toHaveBeenCalledWith(logout({}));
    });

});