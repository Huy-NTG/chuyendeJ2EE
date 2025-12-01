import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<< HEAD
import "./index.css"
=======
import GlobalStyles from './components/GlobalStyles/GlobalStyles.jsx'

import './index.css'
>>>>>>> origin/master
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
<<<<<<< HEAD
    <BrowserRouter>
      <App />
    </BrowserRouter>
=======
    <GlobalStyles>
      <App />
    </GlobalStyles>
>>>>>>> origin/master
  </StrictMode>,
)
