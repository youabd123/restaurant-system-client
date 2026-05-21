import { useState } from 'react'
import { resetPassword } from '../api/authApi'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'

export default function ResetPasswordPage() {
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async () => {
        try {
            await resetPassword({ email })
            setSuccess(true)
        } catch {
            setError('Kunde inte skicka återställningsmail')
        }
    }

    return (
        <Box maxWidth={400} mx="auto" mt={8}>
            <Typography variant="h4" mb={3}>Återställ lösenord</Typography>
            {success && <Alert severity="success" sx={{ mb: 2 }}>Email skickat!</Alert>}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <TextField
                label="Email"
                fullWidth
                sx={{ mb: 2 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button variant="contained" fullWidth onClick={handleSubmit}>
                Skicka återställningsmail
            </Button>
            <Button href="/login" fullWidth sx={{ mt: 1 }}>
                Tillbaka till inloggning
            </Button>
        </Box>
    )
}