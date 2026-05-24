import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

export default function MainLayout({ children }) {
    const { user, logout } = useAuth()
    const isAdmin = user?.roles?.includes('Admin')

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <AppBar position="static" color="primary" elevation={0}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                        <Typography
                            variant="h6"
                            component="a"
                            href="/"
                            sx={{ color: 'inherit', fontWeight: 700, textDecoration: 'none' }}
                        >
                            Restaurant System
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Button color="inherit" href="/">Hem</Button>
                            <Button color="inherit" href="/categories">Kategorier</Button>
                            <Button color="inherit" href="/menu-items">Meny</Button>
                            {isAdmin && <Button color="inherit" href="/orders">Ordrar</Button>}
                            {user ? (
                                <Button color="inherit" onClick={handleLogout}>Logga ut</Button>
                            ) : (
                                <Button color="inherit" href="/login">Logga in</Button>
                            )}
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box component="main" sx={{ py: { xs: 4, md: 6 } }}>
                <Container maxWidth="lg">{children}</Container>
            </Box>

            <Box component="footer" sx={{ borderTop: 1, borderColor: 'divider', py: 3 }}>
                <Container maxWidth="lg">
                    <Typography variant="body2" color="text.secondary">
                        Restaurant System
                    </Typography>
                </Container>
            </Box>
        </Box>
    )
}