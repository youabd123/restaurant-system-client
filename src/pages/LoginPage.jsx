import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login as loginApi } from '../api/authApi'
import { useAuth } from '../context/AuthContext'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      const res = await loginApi({ email, password })
      login(res.data)
      navigate('/')
    } catch {
      setError('Fel email eller lösenord')
    }
  }

  return (
    <Box maxWidth={400} mx="auto" mt={8}>
      <Typography variant="h4" mb={3}>Logga in</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
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
        Logga in
      </Button>
      <Button href="/register" fullWidth sx={{ mt: 1 }}>
        Har du inget konto? Registrera dig
          </Button>
          <Button href="/reset-password" fullWidth sx={{ mt: 1 }}>
              Glömt lösenordet?
          </Button>
    </Box>
  )
}