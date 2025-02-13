import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GoogleTranslateLoader from './features/GoogleTranslateLoader';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <GoogleTranslateLoader />
        <App />
    </React.StrictMode>
);

reportWebVitals();