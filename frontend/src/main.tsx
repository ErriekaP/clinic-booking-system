import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
//import 'bootstrap/dist/css/bootstrap.min.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Theme>
      <App />
    </Theme>
    </BrowserRouter>
  </React.StrictMode>
)
