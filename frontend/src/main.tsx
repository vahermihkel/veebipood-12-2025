import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

// .primary {color: black}; --> import 'bootstrap/dist/css/bootstrap.min.css'; 
// .primary {color: white}; --> index.css

// StrictMode teeb topeltrenderdusi testkeskkonnas (ainult localhostis)
// renderdamine --> HTMLi välja kuvamine
// re-renderdamine --> HTMLi uuendamine
// topeltrenderdus --> 2x HTMLi välja kuvamine kõrvalefektide leidmiseks

// BrowserRouter annab App.tsx failile navigeerimiseks vajalikud oskused
// Navigeerimiseks:
// 1. npm i react-router-dom (paneb node_modules kausta kõik sobilikud failid)
// 2. importima BrowserRouteri vastinstallitud moodulist
// 3. Ümbritsema App faili BrowserRouteriga
// 4. URLi ja HTMLi seoste tekitamine

createRoot(document.getElementById('root')!).render(
  <StrictMode> 
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
