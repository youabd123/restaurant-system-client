import { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useBasket } from '../context/BasketContext'
import { useBooking } from '../context/BookingContext'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import BookingModal from '../components/BookingModal'

function checkIsOpen() {
    const now = new Date()
    const day = now.getDay()
    const time = now.getHours() * 60 + now.getMinutes()
    const isWeekend = day === 0 || day === 6
    return isWeekend ? (time >= 720 && time < 1380) : (time >= 660 && time < 1320)
}

function useIsOpen() {
    const [isOpen, setIsOpen] = useState(checkIsOpen)
    useEffect(() => {
        const id = setInterval(() => setIsOpen(checkIsOpen()), 60000)
        return () => clearInterval(id)
    }, [])
    return isOpen
}

const InstagramSvg = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
)

const FacebookSvg = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
)

export default function MainLayout({ children }) {
    const { user, logout } = useAuth()
    const { totalCount } = useBasket()
    const { openModal } = useBooking()
    const navigate = useNavigate()
    const location = useLocation()
    const isAdmin = user?.roles?.includes('Admin')

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

    const isOpen = useIsOpen()
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
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
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
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                                <Box sx={{
                                    width: 7, height: 7, borderRadius: '50%',
                                    bgcolor: isOpen ? '#5db85d' : '#e08080',
                                    boxShadow: isOpen ? '0 0 6px rgba(93,184,93,0.7)' : '0 0 6px rgba(224,128,128,0.7)',
                                }} />
                                <Typography sx={{
                                    fontSize: '11px',
                                    color: isOpen ? '#7ec87e' : '#e08080',
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontWeight: 400,
                                }}>
                                    {isOpen ? 'Öppet nu' : 'Stängt'}
                                </Typography>
                            </Box>
                        </Box>

                        <Stack direction="row" spacing={0.5} alignItems="center">
                            <Button sx={navBtn('/')} component={Link} to="/">Hem</Button>
                            <Button sx={navBtn('/menu-items')} component={Link} to="/menu-items">Meny</Button>
                            <Button sx={navBtn('/categories')} component={Link} to="/categories">Kategorier</Button>
                            <Button sx={navBtn('/about')} component={Link} to="/about">Om oss</Button>
                            <Button sx={navBtn('/contact')} component={Link} to="/contact">Kontakt</Button>
                            <Button sx={navBtn('/checkout')} component={Link} to="/checkout">
                                Varukorg{totalCount > 0 ? ` (${totalCount})` : ''}
                            </Button>
                            {isAdmin && <Button sx={navBtn('/orders')} component={Link} to="/orders">Ordrar</Button>}

                            <Button
                                onClick={openModal}
                                sx={{
                                    ml: 1,
                                    color: '#140d06',
                                    backgroundColor: '#b8860b',
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: '12px',
                                    fontWeight: 500,
                                    textTransform: 'none',
                                    borderRadius: '20px',
                                    px: 2,
                                    py: 0.6,
                                    transition: 'all 0.2s',
                                    '&:hover': { backgroundColor: '#c9a96e' },
                                }}
                            >
                                Boka bord
                            </Button>

                            {user ? (
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    {displayName && (
                                        <Button
                                            component={Link}
                                            to="/profile"
                                            sx={{
                                                ...navBtn('/profile'),
                                                borderLeft: '0.5px solid rgba(201,169,110,0.2)',
                                                paddingLeft: '12px',
                                                ml: 1,
                                                minWidth: 'auto',
                                            }}
                                        >
                                            {displayName}
                                        </Button>
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
                                        ml: 0.5,
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

            <Box component="footer" sx={{ borderTop: '1px solid rgba(201, 169, 110, 0.08)', pt: 6, pb: 4, bgcolor: '#0f0a04' }}>
                <Container maxWidth="md">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '2rem' }}>
                        <div>
                            <Typography sx={{ fontFamily: "'Playfair Display', serif", color: '#c9a96e', fontSize: '1.5rem', fontStyle: 'italic', mb: 1 }}>
                                Trattoria
                            </Typography>
                            <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(245,237,216,0.35)', fontSize: '13px', lineHeight: 1.75, mb: 2 }}>
                                Autentisk italiensk matlagning sedan 1987. Välkommen till ett stycke Toscana i Göteborg.
                            </Typography>
                            <Stack direction="row" spacing={1.5}>
                                <Box component="a" href="#" aria-label="Instagram" sx={{ color: 'rgba(245,237,216,0.3)', display: 'flex', transition: 'color 0.2s', '&:hover': { color: '#c9a96e' } }}>
                                    <InstagramSvg />
                                </Box>
                                <Box component="a" href="#" aria-label="Facebook" sx={{ color: 'rgba(245,237,216,0.3)', display: 'flex', transition: 'color 0.2s', '&:hover': { color: '#c9a96e' } }}>
                                    <FacebookSvg />
                                </Box>
                            </Stack>
                        </div>

                        <div>
                            <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(201,169,110,0.6)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', mb: 2 }}>
                                Öppettider
                            </Typography>
                            <Stack spacing={0.75}>
                                {[{ day: 'Måndag – Fredag', hours: '11:00 – 22:00' }, { day: 'Lördag – Söndag', hours: '12:00 – 23:00' }].map((row) => (
                                    <Box key={row.day} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                                        <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(245,237,216,0.4)', fontSize: '13px' }}>{row.day}</Typography>
                                        <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(245,237,216,0.55)', fontSize: '13px', whiteSpace: 'nowrap' }}>{row.hours}</Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </div>

                        <div>
                            <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(201,169,110,0.6)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', mb: 2 }}>
                                Kontakt
                            </Typography>
                            <Stack spacing={0.75} sx={{ mb: 2.5 }}>
                                <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(245,237,216,0.45)', fontSize: '13px' }}>Avenyn 12, Göteborg</Typography>
                                <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(245,237,216,0.45)', fontSize: '13px' }}>031-123 456</Typography>
                                <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(245,237,216,0.45)', fontSize: '13px' }}>info@trattoria.se</Typography>
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <Box component={Link} to="/about" sx={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(245,237,216,0.35)', fontSize: '12px', textDecoration: 'none', transition: 'color 0.2s', '&:hover': { color: '#c9a96e' } }}>Om oss</Box>
                                <Box component={Link} to="/contact" sx={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(245,237,216,0.35)', fontSize: '12px', textDecoration: 'none', transition: 'color 0.2s', '&:hover': { color: '#c9a96e' } }}>Kontakt</Box>
                                <Box component={Link} to="/menu-items" sx={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(245,237,216,0.35)', fontSize: '12px', textDecoration: 'none', transition: 'color 0.2s', '&:hover': { color: '#c9a96e' } }}>Meny</Box>
                            </Stack>
                        </div>
                    </div>

                    <Box sx={{ borderTop: '0.5px solid rgba(201,169,110,0.06)', pt: 3, textAlign: 'center' }}>
                        <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(245,237,216,0.2)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                            © 2026 Trattoria · Göteborg · Smaker från Toscana sedan 1987
                        </Typography>
                    </Box>
                </Container>
            </Box>

            <BookingModal />
        </Box>
    )
}