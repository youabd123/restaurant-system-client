import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register as registerApi } from '../api/authApi'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'

export default function RegisterPage() {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async () => {
        try {
            await registerApi({ fullName, email, password })
            navigate('/login')
        } catch {
            setError('Registrering misslyckades')
        }
    }

    const textFieldStyles = {
        mb: 2.5,
        '& .MuiOutlinedInput-root': {
            color: '#f5edd8',
            backgroundColor: '#140d06',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            borderRadius: '8px',
            '& fieldset': { borderColor: 'rgba(201, 169, 110, 0.15)' },
            '&:hover fieldset': { borderColor: 'rgba(201, 169, 110, 0.4)' },
            '&.Mui-focused fieldset': { borderColor: '#b8860b' },
        },
        '& .MuiInputLabel-root': {
            color: 'rgba(245, 237, 216, 0.4)',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            '&.Mui-focused': { color: '#c9a96e' },
        }
    }

    return (
        <Box sx={{ pt: 4, px: 2, fontFamily: "'DM Sans', sans-serif" }}>
            <Box maxWidth={380} mx="auto" sx={{ background: '#1f160c', p: 4, borderRadius: '16px', border: '1px solid rgba(201, 169, 110, 0.08)', boxShadow: '0 15px 40px rgba(0,0,0,0.4)' }}>

                <Typography
                    variant="h4"
                    mb={4}
                    sx={{ fontFamily: "'Playfair Display', serif", color: '#f5edd8', textAlign: 'center', fontWeight: 400, fontStyle: 'italic' }}
                >
                    Bli medlem
                </Typography>

                {error && (
                    <Alert
                        severity="error"
                        sx={{ mb: 2.5, backgroundColor: 'rgba(121, 31, 31, 0.2)', color: '#f09595', border: '1px solid rgba(121, 31, 31, 0.3)', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', borderRadius: '8px' }}
                    >
                        {error}
                    </Alert>
                )}

                <TextField label="Namn" fullWidth sx={textFieldStyles} value={fullName} onChange={(e) => setFullName(e.target.value)} />
                <TextField label="Email" fullWidth sx={textFieldStyles} value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField label="Lösenord" type="password" fullWidth sx={textFieldStyles} value={password} onChange={(e) => setPassword(e.target.value)} />

                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSubmit}
                    sx={{
                        backgroundColor: '#b8860b',
                        color: '#140d06',
                        fontWeight: 500,
                        py: 1.5,
                        borderRadius: '30px',
                        fontFamily: "'DM Sans', sans-serif",
                        textTransform: 'none',
                        fontSize: '14px',
                        boxShadow: '0 5px 15px rgba(184, 134, 11, 0.15)',
                        transition: 'all 0.3s ease',
                        '&:hover': { backgroundColor: '#c9a96e', transform: 'translateY(-1px)', boxShadow: '0 8px 20px rgba(184, 134, 11, 0.25)' }
                    }}
                >
                    Registrera dig
                </Button>

                <Button
                    href="/login"
                    fullWidth
                    sx={{
                        mt: 2,
                        color: 'rgba(201, 169, 110, 0.6)',
                        fontFamily: "'DM Sans', sans-serif",
                        textTransform: 'none',
                        fontSize: '12px',
                        '&:hover': { color: '#f5edd8', background: 'none' }
                    }}
                >
                    Har du redan ett konto? Logga in ✦
                </Button>
            </Box>
        </Box>
    )
}