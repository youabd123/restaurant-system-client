import { useNavigate, Link } from 'react-router-dom'
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
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const navButtonStyle = {
        color: 'rgba(245, 237, 216, 0.7)',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '13px',
        fontWeight: 400,
        textTransform: 'none',
        position: 'relative',
        transition: 'all 0.3s ease',
        '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '4px',
            left: '50%',
            width: '0%',
            height: '1px',
            backgroundColor: '#c9a96e',
            transition: 'all 0.3s ease',
            transform: 'translateX(-50%)'
        },
        '&:hover': {
            color: '#c9a96e',
            backgroundColor: 'transparent',
            '&::after': { width: '60%' }
        }
    }

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
                    zIndex: 1100
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
                                transition: 'opacity 0.2s',
                                '&:hover': { opacity: 0.8 }
                            }}
                        >
                            Trattoria
                        </Typography>

                        <Stack direction="row" spacing={1} alignItems="center">
                            <Button sx={navButtonStyle} component={Link} to="/">Hem</Button>
                            <Button sx={navButtonStyle} component={Link} to="/categories">Kategorier</Button>
                            <Button sx={navButtonStyle} component={Link} to="/menu-items">Meny</Button>
                            {user && <Button sx={navButtonStyle} component={Link} to="/orders">Ordrar</Button>}

                            {user ? (
                                <Button
                                    onClick={handleLogout}
                                    sx={{
                                        ...navButtonStyle,
                                        color: '#f09595',
                                        '&::after': { backgroundColor: '#f09595' },
                                        '&:hover': { color: '#ffb3b3' }
                                    }}
                                >
                                    Logga ut
                                </Button>
                            ) : (
                                <Button
                                    component={Link}
                                    to="/login"
                                    sx={{
                                        ...navButtonStyle,
                                        color: '#c9a96e',
                                        fontWeight: 500,
                                        border: '1px solid rgba(201,169,110,0.3)',
                                        borderRadius: '6px',
                                        px: 2,
                                        py: 0.5,
                                        '&:hover': { border: '1px solid #c9a96e', backgroundColor: 'rgba(201,169,110,0.05)' },
                                        '&::after': { display: 'none' }
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