import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GlobalStyles from './components/GlobalStyles/GlobalStyles.jsx'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyles>
      <App />
    </GlobalStyles>
  </StrictMode>,
)
