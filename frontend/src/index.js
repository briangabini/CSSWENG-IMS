import React from 'react';
import { createRoot } from 'react-dom';
import './index.css';
import App from './App';

// Context
import { InventoryItemsContextProvider } from './context/InventoryContext';
import { AuthContextProvider } from './context/AuthContext';
import { TransactionTypeContextProvider } from './context/TransactionTypeContext';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <TransactionTypeContextProvider>
      <InventoryItemsContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </InventoryItemsContextProvider>
    </TransactionTypeContextProvider>
  </React.StrictMode>
);
