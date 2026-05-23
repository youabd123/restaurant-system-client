import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

export default function HomePage() {
    return (
        <Box
            sx={{
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                borderRadius: 4,
                px: 4,
                py: 8,
            }}
        >
            <Container maxWidth="md">
                <Stack spacing={4} alignItems="center" textAlign="center">
                    <Typography
                        variant="h2"
                        fontWeight={800}
                        sx={{ color: 'white', letterSpacing: '-1px' }}
                    >
                        🍽️ Restaurant System
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 500 }}>
                        Utforska våra kategorier och menyartiklar. Logga in för att lägga en beställning.
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="contained"
                            size="large"
                            href="/categories"
                            sx={{ borderRadius: 3, px: 4, fontWeight: 700 }}
                        >
                            Se kategorier
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            href="/menu-items"
                            sx={{ borderRadius: 3, px: 4, fontWeight: 700, color: 'white', borderColor: 'white' }}
                        >
                            Se menyn
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    )
}