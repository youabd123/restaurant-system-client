import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login as loginApi } from '../api/authApi'
import { useAuth } from '../context/AuthContext'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async () => {
        if (!email || !password || loading) return
        setLoading(true)
        setError(null)
        try {
            const res = await loginApi({ email, password })
            login(res.data)
            navigate('/')
        } catch {
            setError('Fel e-postadress eller lösenord.')
        } finally {
            setLoading(false)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSubmit()
    }

    const fieldSx = {
        mb: 2.5,
        '& .MuiOutlinedInput-root': {
            color: '#f5edd8',
            backgroundColor: 'rgba(255,255,255,0.02)',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            borderRadius: '8px',
            '& fieldset': { borderColor: 'rgba(201,169,110,0.15)' },
            '&:hover fieldset': { borderColor: 'rgba(201,169,110,0.35)' },
            '&.Mui-focused fieldset': { borderColor: '#b8860b', borderWidth: '1px' },
        },
        '& .MuiInputLabel-root': {
            color: 'rgba(245,237,216,0.35)',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            '&.Mui-focused': { color: '#c9a96e' },
        },
    }

    return (
        <Box sx={{ pt: 4, px: 2, fontFamily: "'DM Sans', sans-serif" }}>
            <Box
                maxWidth={380}
                mx="auto"
                sx={{
                    background: '#1a1208',
                    p: '2.5rem',
                    borderRadius: '16px',
                    border: '0.5px solid rgba(201,169,110,0.12)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.45)',
                }}
            >
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Box sx={{ color: '#c9a96e', fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', mb: 1.5, opacity: 0.7 }}>
                        Trattoria
                    </Box>
                    <Typography sx={{
                        fontFamily: "'Playfair Display', serif",
                        color: '#f5edd8',
                        fontWeight: 400,
                        fontStyle: 'italic',
                        fontSize: '1.9rem',
                    }}>
                        Logga in
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mt: 1.5 }}>
                        <Box sx={{ width: 40, height: '0.5px', bgcolor: 'rgba(201,169,110,0.3)' }} />
                        <Box sx={{ color: '#c9a96e', fontSize: '9px', opacity: 0.5 }}>✦</Box>
                        <Box sx={{ width: 40, height: '0.5px', bgcolor: 'rgba(201,169,110,0.3)' }} />
                    </Box>
                </Box>

                {error && (
                    <Alert
                        severity="error"
                        sx={{
                            mb: 2.5,
                            backgroundColor: 'rgba(121,31,31,0.18)',
                            color: '#f09595',
                            border: '0.5px solid rgba(121,31,31,0.35)',
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '13px',
                            borderRadius: '8px',
                        }}
                    >
                        {error}
                    </Alert>
                )}

                <TextField
                    label="E-postadress"
                    fullWidth
                    sx={fieldSx}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoComplete="email"
                />
                <TextField
                    label="Lösenord"
                    type="password"
                    fullWidth
                    sx={fieldSx}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoComplete="current-password"
                />

                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={loading}
                    sx={{
                        backgroundColor: '#b8860b',
                        color: '#140d06',
                        fontWeight: 500,
                        py: 1.5,
                        borderRadius: '30px',
                        fontFamily: "'DM Sans', sans-serif",
                        textTransform: 'none',
                        fontSize: '14px',
                        boxShadow: '0 5px 18px rgba(184,134,11,0.2)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: '#c9a96e',
                            transform: 'translateY(-1px)',
                            boxShadow: '0 8px 22px rgba(184,134,11,0.3)',
                        },
                        '&:disabled': {
                            backgroundColor: 'rgba(184,134,11,0.35)',
                            color: 'rgba(20,13,6,0.6)',
                        },
                    }}
                >
                    {loading ? <CircularProgress size={18} sx={{ color: '#140d06' }} /> : 'Logga in'}
                </Button>

                <Button
                    component={Link}
                    to="/register"
                    fullWidth
                    sx={{
                        mt: 2,
                        color: 'rgba(201,169,110,0.55)',
                        fontFamily: "'DM Sans', sans-serif",
                        textTransform: 'none',
                        fontSize: '12px',
                        '&:hover': { color: '#f5edd8', background: 'none' }
                    }}
                >
                    Inget konto? Skapa ett konto ✦
                </Button>
            </Box>
        </Box>
    )
}
