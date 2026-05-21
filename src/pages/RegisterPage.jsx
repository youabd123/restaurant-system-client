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

    return (
        <Box maxWidth={400} mx="auto" mt={8}>
            <Typography variant="h4" mb={3}>Registrera</Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <TextField
                label="Namn"
                fullWidth
                sx={{ mb: 2 }}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
            />
            <TextField
                label="Email"
                fullWidth
                sx={{ mb: 2 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label="Lösenord"
                type="password"
                fullWidth
                sx={{ mb: 2 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" fullWidth onClick={handleSubmit}>
                Registrera
            </Button>
            <Button href="/login" fullWidth sx={{ mt: 1 }}>
                Har du redan ett konto? Logga in
            </Button>
        </Box>
    )
}