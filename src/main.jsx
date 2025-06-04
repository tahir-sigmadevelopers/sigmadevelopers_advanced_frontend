import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './store.js'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { Auth0Provider } from '@auth0/auth0-react';


ReactDOM.createRoot(document.getElementById('root')).render(
  <>

    <Auth0Provider
      domain="dev-evqdlccwscceetqf.us.auth0.com"
      clientId="ziDnf9HGTwxBAZvVT0SphOTiAEpyaEO4"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>

    </Auth0Provider>
  </ >
)
