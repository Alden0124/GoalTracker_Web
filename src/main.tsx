// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/assets/style/index.css'
import App from './App.tsx'
import './plugin/i18n.ts'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <App />
  // </StrictMode>,
)
