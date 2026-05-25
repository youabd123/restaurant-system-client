import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { BasketProvider } from './context/BasketContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <BasketProvider>
                    <App />
                </BasketProvider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>,
)
