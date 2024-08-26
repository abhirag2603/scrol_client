import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import App from './App.jsx'
import './index.css'
import { loadFromLocalStorage } from './utils/storage.js'

const savedTheme = loadFromLocalStorage('themeMode') || 'light';
document.documentElement.classList.toggle('dark', savedTheme === 'dark');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RecoilRoot>
    <App />
    </RecoilRoot>
  </StrictMode>,
)
