import React from 'react';
import {AuthRoutes} from "../auth/routes/AuthRoutes.jsx";
import {JournalRoutes} from "../journal/routes/JournalRoutes.jsx";
import {Route, Routes} from "react-router-dom";

export const AppRouter = () => {
    return (

        <Routes>

            {/*login*/}
            <Route path="/auth/*" element={ <AuthRoutes/> }/>

            {/*JournalAPP*/}
            <Route path="/*" element={ <JournalRoutes/> }/>
        </Routes>

    );
}