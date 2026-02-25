import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import QueryProvider from './components/providers/QueryProvider.tsx'
import { Toaster } from './components/ui/sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <App />
      <Toaster position="top-right" richColors />
    </QueryProvider>
  </StrictMode>,
)
