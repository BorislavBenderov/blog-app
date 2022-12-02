import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthContextProvider } from './contexts/AuthContext';
import { PostContextProvider } from './contexts/PostContext';
import App from './App';
import 'font-awesome/css/font-awesome.css';
import { UserContextProvider } from './contexts/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <PostContextProvider>
            <UserContextProvider>
                <App />
            </UserContextProvider>
        </PostContextProvider>
    </AuthContextProvider>
);
