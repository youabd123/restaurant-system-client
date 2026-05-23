import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'

export default function ResetPasswordPage() {
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setSuccess(true)
    }

    return (
        <Box maxWidth={400} mx="auto" mt={8} component="form" onSubmit={handleSubmit}>
            <Typography variant="h4" mb={3}>Återställ lösenord</Typography>
            {success && <Alert severity="success" sx={{ mb: 2 }}>Email skickat!</Alert>}
            <TextField
                label="Email"
                fullWidth
                sx={{ mb: 2 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button variant="contained" fullWidth type="submit">
                Skicka återställningsmail
            </Button>
            <Button href="/login" fullWidth sx={{ mt: 1 }}>
                Tillbaka till inloggning
            </Button>
        </Box>
    )
}