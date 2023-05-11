import {fireEvent, render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";

import {authSlice} from "../../../src/store/auth/authSlice.js";
import {LoginScreen} from "../../../src/auth/screens/LoginScreen.jsx";

import {notAuthenticatedState} from "../../fixtures/authFixtures.js";
import {startEmailPasswordSignIn, startGoogleSignIn} from "../../../src/store/auth/thunks.js";


const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
});


const mockStartGoogleSignIn = jest.fn();
const mockStartEmailPasswordSignIn = jest.fn();


jest.mock("../../../src/store/auth/thunks.js", () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startEmailPasswordSignIn: ({email, password}) => {
        return () => mockStartEmailPasswordSignIn({email, password})
    },
}))

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => (fn) => fn(),
}))


describe('test on LoginScreen', function () {

    beforeEach(() => jest.clearAllMocks());

    test('should be show success component', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginScreen/>
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);

        // screen.debug();
    });


    test('should be button google call to startGoogleSignIn', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginScreen/>
                </MemoryRouter>
            </Provider>
        );

        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click(googleBtn);

        expect(mockStartGoogleSignIn).toHaveBeenCalled();

    })

    test('should be call to startEmailPasswordSignIn', () => {
        const email = 'inginf.german.fernandez@gmail.com';
        const password = '123456';
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginScreen/>
                </MemoryRouter>
            </Provider>
        );

        const inputEmail = screen.getByRole('textbox', {name: 'Correo'});
        fireEvent.change(inputEmail, {target: {name: 'email', value: email}});
        const inputPassword = screen.getByTestId('password');
        fireEvent.change(inputPassword, {target: {name: 'password', value: password}});

        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit(loginForm);

        expect( mockStartEmailPasswordSignIn ).toHaveBeenCalledWith({email, password});

    })


});