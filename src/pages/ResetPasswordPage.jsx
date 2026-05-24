import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import InputAdornment from '@mui/material/InputAdornment'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import { resetPassword } from '../api/authApi'

export default function ResetPasswordPage() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ email: '', newPassword: '', confirmPassword: '' })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (form.newPassword !== form.confirmPassword) {
            setError('Lösenorden matchar inte.')
            return
        }
        setLoading(true)
        setError('')
        try {
            await resetPassword({ email: form.email, newPassword: form.newPassword })
            setSuccess(true)
            setTimeout(() => navigate('/login'), 2000)
        } catch {
            setError('Kunde inte återställa lösenordet. Kontrollera e-postadressen.')
        } finally {
            setLoading(false)
        }
    }

    const inputSx = {
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': { borderColor: '#8B1A1A' },
            '&.Mui-focused fieldset': { borderColor: '#8B1A1A' },
        },
        '& .MuiInputLabel-root.Mui-focused': { color: '#8B1A1A' },
    }

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', background: 'linear-gradient(135deg, #FDF6EE 0%, #F5E6D3 100%)' }}>
            <Box
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    width: '45%',
                    background: 'linear-gradient(160deg, #1A0A00 0%, #2C1010 50%, #8B1A1A 100%)',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 6,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Box sx={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', border: '1px solid rgba(200,169,81,0.1)' }} />
                <Typography variant="caption" sx={{ color: '#C8A951', letterSpacing: '4px', fontSize: '0.7rem', fontFamily: '"Lato", sans-serif', mb: 2 }}>
                    ÅTERSTÄLL LÖSENORD
                </Typography>
                <Typography variant="h3" sx={{ color: '#FFF8F0', fontFamily: '"Cormorant Garamond", serif', fontWeight: 700, textAlign: 'center', mb: 1 }}>
                    Ristorante
                </Typography>
                <Typography variant="h3" sx={{ color: '#C8A951', fontFamily: '"Cormorant Garamond", serif', fontWeight: 700, fontStyle: 'italic', textAlign: 'center', mb: 4 }}>
                    Bella Italia
                </Typography>
                <Box sx={{ width: 40, height: 1, bgcolor: 'rgba(200,169,81,0.5)', mb: 4 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,248,240,0.6)', textAlign: 'center', maxWidth: 280, lineHeight: 1.8, fontFamily: '"Lato", sans-serif' }}>
                    Ange din e-postadress och ditt nya lösenord för att återställa kontot.
                </Typography>
            </Box>

            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: { xs: 3, md: 6 } }}>
                <Box sx={{ width: '100%', maxWidth: 380 }}>
                    <Button variant="text" onClick={() => navigate(-1)} sx={{ mb: 2, color: 'text.secondary', fontFamily: '"Lato", sans-serif', pl: 0 }}>
                        ← Tillbaka
                    </Button>

                    <Typography variant="h4" sx={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 700, mb: 0.5 }}>
                        Återställ lösenord
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 4, fontFamily: '"Lato", sans-serif' }}>
                        Fyll i din e-post och nytt lösenord
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>Lösenordet återställt! Omdirigerar till login...</Alert>}

                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                        <TextField label="E-postadress" name="email" type="email" value={form.email} onChange={handleChange} required fullWidth InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon sx={{ color: '#8B1A1A', fontSize: 18 }} /></InputAdornment> }} sx={inputSx} />
                        <TextField label="Nytt lösenord" name="newPassword" type="password" value={form.newPassword} onChange={handleChange} required fullWidth InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon sx={{ color: '#8B1A1A', fontSize: 18 }} /></InputAdornment> }} sx={inputSx} />
                        <TextField label="Bekräfta lösenord" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required fullWidth InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon sx={{ color: '#8B1A1A', fontSize: 18 }} /></InputAdornment> }} sx={inputSx} />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={loading || success}
                            sx={{
                                mt: 1,
                                py: 1.5,
                                background: 'linear-gradient(135deg, #8B1A1A 0%, #B22222 100%)',
                                '&:hover': { background: 'linear-gradient(135deg, #5C1111 0%, #8B1A1A 100%)' },
                            }}
                        >
                            {loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Återställ lösenord'}
                        </Button>
                    </Box>

                    <Typography variant="body2" sx={{ mt: 3, textAlign: 'center', fontFamily: '"Lato", sans-serif', color: 'text.secondary' }}>
                        <Link to="/login" style={{ color: '#8B1A1A', fontWeight: 700, textDecoration: 'none' }}>
                            Tillbaka till login
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}