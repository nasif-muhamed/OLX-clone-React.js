import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FirebaseProvider } from './store/FirebaseContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FirebaseProvider>
    <App />
  </FirebaseProvider>
);

