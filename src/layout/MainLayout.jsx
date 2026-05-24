import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

export default function MainLayout({ children }) {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const isAdmin = user?.roles?.includes('Admin')

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#1a1208' }}>
            <Box sx={{ bgcolor: '#1a1208', borderBottom: '1px solid rgba(200,169,81,0.2)' }}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 0.5 }}>
                        <Typography
                            component="a"
                            href="/"
                            sx={{
                                color: '#f5edd8',
                                textDecoration: 'none',
                                fontFamily: "'Playfair Display', serif",
                                fontSize: '1.4rem',
                                fontWeight: 700,
                            }}
                        >
                            Trattoria Bella
                        </Typography>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            {[
                                { label: 'Hem', href: '/' },
                                { label: 'Kategorier', href: '/categories' },
                                { label: 'Meny', href: '/menu-items' },
                                ...(isAdmin ? [{ label: 'Ordrar', href: '/orders' }] : []),
                            ].map((item) => (
                                <Button key={item.href} href={item.href} sx={{
                                    color: 'rgba(245,237,216,0.75)',
                                    fontSize: '13px',
                                    fontWeight: 400,
                                    '&:hover': { color: '#c9a96e', bgcolor: 'transparent' },
                                }}>
                                    {item.label}
                                </Button>
                            ))}
                            {user ? (
                                <Button onClick={handleLogout} sx={{
                                    ml: 1, color: '#1a1208', bgcolor: '#c9a96e',
                                    fontSize: '12px', fontWeight: 500, px: 2, borderRadius: '20px',
                                    '&:hover': { bgcolor: '#b8935a' },
                                }}>
                                    Logga ut
                                </Button>
                            ) : (
                                <Button href="/login" sx={{
                                    ml: 1, color: '#1a1208', bgcolor: '#c9a96e',
                                    fontSize: '12px', fontWeight: 500, px: 2, borderRadius: '20px',
                                    '&:hover': { bgcolor: '#b8935a' },
                                }}>
                                    Logga in
                                </Button>
                            )}
                        </Stack>
                    </Toolbar>
                </Container>
            </Box>

            <Box component="main">
                <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
                    {children}
                </Container>
            </Box>

            <Box component="footer" sx={{ bgcolor: '#1a1208', borderTop: '1px solid rgba(200,169,81,0.2)', py: 3, mt: 8 }}>
                <Container maxWidth="lg">
                    <Typography variant="body2" sx={{ color: 'rgba(245,237,216,0.4)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        Trattoria Bella · Göteborg · Sedan 1987
                    </Typography>
                </Container>
            </Box>
        </Box>
    )
}