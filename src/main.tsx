import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const applyUiZoomCompensation = () => {
  const dpr = window.devicePixelRatio || 1
  const isDesktop = window.innerWidth >= 1024
  const shouldCompensate = isDesktop && dpr > 1 && dpr < 2
  const zoom = shouldCompensate ? Number((1 / dpr).toFixed(3)) : 1
  document.documentElement.style.setProperty('--ui-zoom', String(zoom))
}

applyUiZoomCompensation()
window.addEventListener('resize', applyUiZoomCompensation)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
