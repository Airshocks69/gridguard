/**
 * Application Entry Point
 * 
 * Initializes and mounts the React application.
 * 
 * @module main
 * @author GridGuard Development Team
 * @version 1.0.0
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
