import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Import your CSS file with Tailwind directives

const root = ReactDOM.createRoot(document.getElementById('root')!); // Ensure the root element exists
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);