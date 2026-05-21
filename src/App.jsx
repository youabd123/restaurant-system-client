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
            <MainLayout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/categories" element={<CategoriesPage />} />
                    <Route path="/menu-items" element={<MenuItemsPage />} />
                    <Route path="/orders" element={
                        <ProtectedRoute>
                            <OrdersPage />
                        </ProtectedRoute>
                    } />
                </Routes>
            </MainLayout>
        </ThemeProvider>
    )
}

export default App