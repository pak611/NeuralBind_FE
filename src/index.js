// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
//import AppRoutes from './components/AppRoutes'; // Import your routing component
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);