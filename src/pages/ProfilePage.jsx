import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import PageHeader from '../components/PageHeader'

const rowSx = {
    background: '#1a1208',
    border: '0.5px solid rgba(201,169,110,0.12)',
    borderRadius: '10px',
    p: '1.25rem 1.75rem',
}

export default function ProfilePage() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const displayName = user?.fullName || user?.email?.split('@')[0] || '—'

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <Box sx={{ fontFamily: "'DM Sans', sans-serif", pb: 6 }}>
            <PageHeader title="Min profil" subtitle="Mitt konto" />

            <Container maxWidth="sm">
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                    <Box sx={rowSx}>
                        <Typography sx={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.55)', mb: 0.75, fontFamily: "'DM Sans', sans-serif" }}>
                            Namn
                        </Typography>
                        <Typography sx={{ color: '#f5edd8', fontFamily: "'Playfair Display', serif", fontSize: '1.2rem' }}>
                            {displayName}
                        </Typography>
                    </Box>

                    <Box sx={rowSx}>
                        <Typography sx={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.55)', mb: 0.75, fontFamily: "'DM Sans', sans-serif" }}>
                            E-post
                        </Typography>
                        <Typography sx={{ color: '#f5edd8', fontFamily: "'DM Sans', sans-serif", fontSize: '14px' }}>
                            {user?.email || '—'}
                        </Typography>
                    </Box>

                    {user?.roles?.length > 0 && (
                        <Box sx={rowSx}>
                            <Typography sx={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.55)', mb: 0.75, fontFamily: "'DM Sans', sans-serif" }}>
                                Roll
                            </Typography>
                            <Typography sx={{ color: '#f5edd8', fontFamily: "'DM Sans', sans-serif", fontSize: '14px' }}>
                                {user.roles.join(', ')}
                            </Typography>
                        </Box>
                    )}
                </Box>

                <Button
                    onClick={handleLogout}
                    sx={{
                        color: '#f09595',
                        fontFamily: "'DM Sans', sans-serif",
                        textTransform: 'none',
                        fontSize: '13px',
                        border: '0.5px solid rgba(224,128,128,0.3)',
                        borderRadius: '8px',
                        px: 3,
                        py: 0.8,
                        '&:hover': { borderColor: '#f09595', backgroundColor: 'rgba(224,128,128,0.05)' },
                    }}
                >
                    Logga ut
                </Button>
            </Container>
        </Box>
    )
}
