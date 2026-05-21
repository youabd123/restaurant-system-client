import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'
import MainLayout from './layout/MainLayout'
import HomePage from './pages/HomePage'
import CategoriesPage from './pages/CategoriesPage'
import MenuItemsPage from './pages/MenuItemsPage'
import OrdersPage from './pages/OrdersPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from "./pages/RegisterPage"
import RequireAuth from "./components/RequireAuth"

function App() {
    return (
        <ThemeProvider theme={theme}>
            <MainLayout>
                <Routes>
                    {/* Öppna sidor */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Skyddade sidor */}
                    <Route
                        path="/categories"
                        element={
                            <RequireAuth>
                                <CategoriesPage />
                            </RequireAuth>
                        }
                    />

                    <Route
                        path="/menu-items"
                        element={
                            <RequireAuth>
                                <MenuItemsPage />
                            </RequireAuth>
                        }
                    />

                    <Route
                        path="/orders"
                        element={
                            <RequireAuth>
                                <OrdersPage />
                            </RequireAuth>
                        }
                    />
                </Routes>
            </MainLayout>
        </ThemeProvider>
    )
}

export default App

