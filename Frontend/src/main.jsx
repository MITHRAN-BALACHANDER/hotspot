import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="981021420599-vqfmumctji7qbrckv3bcg7u21kk6ei6p.apps.googleusercontent.com">
    <App/>
    </GoogleOAuthProvider>
  </StrictMode>,
)
