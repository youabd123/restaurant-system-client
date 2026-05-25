import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'
import MainLayout from './layout/MainLayout'
import HomePage from './pages/HomePage'
import CategoriesPage from './pages/CategoriesPage'
import MenuItemsPage from './pages/MenuItemsPage'
import OrdersPage from './pages/OrdersPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
    return (
        <ThemeProvider theme={theme}>
            {/* Globala CSS-förbättringar för mjuk scroll och snygga scrollbarer */}
            <style>{`
                html { scroll-behavior: smooth; background-color: #140d06; }
                body { margin: 0; padding: 0; background-color: #140d06; }
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-track { background: #140d06; }
                ::-webkit-scrollbar-thumb { background: #2a1e12; border-radius: 4px; }
                ::-webkit-scrollbar-thumb:hover { background: #c9a96e; }
            `}</style>

            <div style={{
                backgroundColor: '#140d06',
                minHeight: '100vh',
                color: '#f5edd8',
                fontFamily: "'DM Sans', sans-serif",
                display: 'flex',
                flexDirection: 'column'
            }}>
                <MainLayout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/categories" element={<CategoriesPage />} />
                        <Route path="/menu-items" element={<MenuItemsPage />} />

                        {/* Denna route kräver nu att man är inloggad och har rollen Admin */}
                        <Route path="/orders" element={
                            <ProtectedRoute requiredRole="Admin">
                                <OrdersPage />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </MainLayout>
            </div>
        </ThemeProvider>
    )
}
export default App