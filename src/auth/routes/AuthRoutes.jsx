import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {LoginScreen, RegisterScreen} from "../screens/index.js";

export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="login" element={ <LoginScreen/> }/>
            <Route path="register" element={ <RegisterScreen/> }/>

            {/*not logged or not logging*/}
            <Route path="/*" element={ <Navigate to="/auth/login" /> }/>
        </Routes>
    );
}
