import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'
import MainLayout from './layout/MainLayout'
import HomePage from './pages/HomePage'
import CategoriesPage from './pages/CategoriesPage'
import MenuItemsPage from './pages/MenuItemsPage'
import OrdersPage from './pages/OrdersPage'
import LoginPage from './pages/LoginPage'   // ⭐ Lägg till denna import
import RegisterPage from "./pages/RegisterPage";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/categories" element={<CategoriesPage />} />
                    <Route path="/menu-items" element={<MenuItemsPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </MainLayout>
        </ThemeProvider>
    )
}

export default App
