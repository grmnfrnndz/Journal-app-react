import React from 'react';
import ReactDOM from 'react-dom/client';

import {JournalApp} from "./JournalAPP.jsx";
import './styles.css';
import {BrowserRouter} from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/*BrowserRouter always use to Routes*/}
        <BrowserRouter>
            <JournalApp/>
        </BrowserRouter>
    </React.StrictMode>,
)
