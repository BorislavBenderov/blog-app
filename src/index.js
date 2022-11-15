import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthContextProvider } from './contexts/AuthContext';
import App from './App';
import 'font-awesome/css/font-awesome.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <App />
    </AuthContextProvider>
);
