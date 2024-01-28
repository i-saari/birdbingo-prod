import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ThemeProvider} from "@mui/material/styles";
import {theme} from "./bingoTheme";
import {Analytics} from "@vercel/analytics/react";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <ThemeProvider theme={theme}>
        <React.StrictMode>
            <App/>
            <Analytics/>
        </React.StrictMode>
    </ThemeProvider>
);


