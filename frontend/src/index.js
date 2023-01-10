import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { TicketsContextProvider } from './context/TicketsContext'
import { AuthContextProvider } from './context/AuthContext'
//import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TicketsContextProvider>
        <App />
      </TicketsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
