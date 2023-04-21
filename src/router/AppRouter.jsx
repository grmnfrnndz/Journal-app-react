import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";

import {AuthRoutes} from "../auth/routes/AuthRoutes.jsx";
import {JournalRoutes} from "../journal/routes/JournalRoutes.jsx";

import {CheckingAuth} from "../ui";
import {UseCheckAuth} from "../hooks/useCheckAuth.js";

export const AppRouter = () => {

    const status = UseCheckAuth();

    if (status === 'checking') {
        return <CheckingAuth/>
    }

    return (
        <Routes>
            {
                (status === 'authenticated')
                    ? <Route path="/*" element={<JournalRoutes/>}/>
                    : <Route path="/auth/*" element={<AuthRoutes/>}/>
            }
            
            <Route path='/*' element={<Navigate to='/auth/login'/>} />

            {/*login*/}
            {/*<Route path="/auth/*" element={<AuthRoutes/>}/>*/}
            {/*JournalAPP*/}
            {/*<Route path="/*" element={<JournalRoutes/>}/>*/}
        </Routes>
    );
}