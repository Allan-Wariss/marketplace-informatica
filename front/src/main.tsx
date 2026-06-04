import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: { fontFamily: 'inherit', fontSize: '0.9rem' },
        success: { style: { background: '#d1fae5', color: '#065f46', border: '1px solid #6ee7b7' } },
        error: { style: { background: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5' } },
      }}
    />
  </BrowserRouter>,
)
