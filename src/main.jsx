import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {GoogleOAuthProvider} from '@react-oauth/google'
//import {GoogleOauthProvider} from '@react-oauth/google'

const CLIENT_ID="981021420599-vqfmumctji7qbrckv3bcg7u21kk6ei6p.apps.googleusercontent.com"
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <GoogleOAuthProvider clientId={CLIENT_ID}>
    <App />
    </GoogleOAuthProvider>
    
  </StrictMode>
)
