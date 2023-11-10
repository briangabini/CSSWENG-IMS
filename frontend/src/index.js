import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Context
import { InventoryItemsContextProvider } from './context/InventoryContext';
import { AuthContextProvider } from './context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <InventoryItemsContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </InventoryItemsContextProvider>
  </React.StrictMode>
);
