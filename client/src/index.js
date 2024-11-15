import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));

//import { GoogleOAuthProvider } from '@react-oauth/google';
root.render(
  <GoogleOAuthProvider clientId="825975212805-n5733i1cplhp03pb7clju1825bq18p1l.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);

reportWebVitals(console.log);
