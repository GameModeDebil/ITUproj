import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { TicketsContextProvider } from './context/TicketsContext'
import { MessagesContextProvider } from './context/MessagesContext'
import { AuthContextProvider } from './context/AuthContext'
//import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TicketsContextProvider>
        <MessagesContextProvider>
        <App />
        </MessagesContextProvider>
      </TicketsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
