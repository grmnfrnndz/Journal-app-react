import React from 'react';
import {AppRouter} from "./router/AppRouter.jsx";
import {AppTheme} from "./theme";

export const JournalApp = () => {
    return (
        <AppTheme>
            <AppRouter/>
        </AppTheme>
    );
}