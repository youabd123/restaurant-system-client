import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useBasket } from '../context/BasketContext'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

export default function MainLayout({ children }) {
    const { user, logout } = useAuth()
    const { totalCount } = useBasket()
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const navBtn = (to) => ({
        color: location.pathname === to ? '#c9a96e' : 'rgba(245, 237, 216, 0.7)',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '13px',
        fontWeight: location.pathname === to ? 500 : 400,
        textTransform: 'none',
        position: 'relative',
        transition: 'all 0.3s ease',
        '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '4px',
            left: '50%',
            width: location.pathname === to ? '60%' : '0%',
            height: '1px',
            backgroundColor: '#c9a96e',
            transition: 'all 0.3s ease',
            transform: 'translateX(-50%)',
        },
        '&:hover': {
            color: '#c9a96e',
            backgroundColor: 'transparent',
            '&::after': { width: '60%' },
        },
    })

    const displayName = user?.fullName || user?.email?.split('@')[0] || null

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#140d06' }}>
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    bgcolor: 'rgba(31, 22, 12, 0.75)',
                    backdropFilter: 'blur(20px)',
                    borderBottom: '1px solid rgba(201, 169, 110, 0.1)',
                    top: 0,
                    zIndex: 1100,
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: '70px' }}>
                        <Typography
                            variant="h6"
                            component={Link}
                            to="/"
                            sx={{
                                color: '#f5edd8',
                                fontFamily: "'Playfair Display', serif",
                                fontWeight: 400,
                                fontStyle: 'italic',
                                textDecoration: 'none',
                                letterSpacing: '1px',
                                '&:hover': { opacity: 0.8 },
                            }}
                        >
                            Trattoria
                        </Typography>

                        <Stack direction="row" spacing={1} alignItems="center">
                            <Button sx={navBtn('/')} component={Link} to="/">Hem</Button>
                            <Button sx={navBtn('/categories')} component={Link} to="/categories">Kategorier</Button>
                            <Button sx={navBtn('/menu-items')} component={Link} to="/menu-items">Meny</Button>
                            <Button sx={navBtn('/checkout')} component={Link} to="/checkout">
                                Varukorg{totalCount > 0 ? ` (${totalCount})` : ''}
                            </Button>
                            {user && <Button sx={navBtn('/orders')} component={Link} to="/orders">Ordrar</Button>}

                            {user ? (
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    {displayName && (
                                        <Typography sx={{
                                            fontSize: '12px',
                                            color: 'rgba(201,169,110,0.7)',
                                            fontFamily: "'DM Sans', sans-serif",
                                            borderLeft: '0.5px solid rgba(201,169,110,0.2)',
                                            paddingLeft: '12px',
                                        }}>
                                            {displayName}
                                        </Typography>
                                    )}
                                    <Button
                                        onClick={handleLogout}
                                        sx={{
                                            color: '#f09595',
                                            fontFamily: "'DM Sans', sans-serif",
                                            fontSize: '13px',
                                            textTransform: 'none',
                                            fontWeight: 400,
                                            '&:hover': { color: '#ffb3b3', backgroundColor: 'transparent' },
                                        }}
                                    >
                                        Logga ut
                                    </Button>
                                </Stack>
                            ) : (
                                <Button
                                    component={Link}
                                    to="/login"
                                    sx={{
                                        color: '#c9a96e',
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: '13px',
                                        fontWeight: 500,
                                        textTransform: 'none',
                                        border: '1px solid rgba(201,169,110,0.3)',
                                        borderRadius: '6px',
                                        px: 2,
                                        py: 0.5,
                                        '&:hover': { border: '1px solid #c9a96e', backgroundColor: 'rgba(201,169,110,0.05)' },
                                    }}
                                >
                                    Logga in
                                </Button>
                            )}
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box component="main" sx={{ flexGrow: 1, py: { xs: 6, md: 8 } }}>
                <Container maxWidth="md">{children}</Container>
            </Box>

            <Box component="footer" sx={{ borderTop: '1px solid rgba(201, 169, 110, 0.05)', py: 5, bgcolor: '#0f0a04' }}>
                <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ fontFamily: "'Playfair Display', serif", color: '#c9a96e', fontSize: '15px', mb: 1 }}>
                        ✦ Trattoria ✦
                    </Typography>
                    <Typography variant="caption" sx={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(245, 237, 216, 0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '10px' }}>
                        Göteborg · Smaker från Toscana sedan 1987
                    </Typography>
                </Container>
            </Box>
        </Box>
    )
}
