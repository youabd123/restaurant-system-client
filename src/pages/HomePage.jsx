import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

export default function HomePage() {
    return (
        <Box
            sx={{
                minHeight: '75vh',
                display: 'flex',
                alignItems: 'center',
                background: 'radial-gradient(circle, #1a1208 0%, #140d06 100%)', // Lyxig vinjett-effekt
                borderRadius: '16px', // Mer rundade hörn för modern "kort-look"
                border: '1px solid rgba(201, 169, 110, 0.05)',
                px: 4,
                py: 8,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
            }}
        >
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(201,169,110,0.01) 40px, rgba(201,169,110,0.01) 41px)',
                pointerEvents: 'none'
            }} />

            <Container maxWidth="sm">
                <Stack spacing={4} alignItems="center" textAlign="center">
                    <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c9a96e', opacity: 0.8 }}>
                        Ett genuint hantverk
                    </div>

                    <Typography
                        variant="h2"
                        fontWeight={400}
                        sx={{
                            fontFamily: "'Playfair Display', serif",
                            color: '#f5edd8',
                            letterSpacing: '1px',
                            fontSize: { xs: '2.5rem', md: '3.5rem' }
                        }}
                    >
                        Smaka på Toscana
                    </Typography>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%', justifyContent: 'center', color: '#c9a96e' }}>
                        <span style={{ width: '40px', height: '0.5px', background: '#c9a96e', opacity: 0.3 }}></span>
                        <span style={{ fontSize: '14px', transform: 'rotate(45deg)' }}>✦</span>
                        <span style={{ width: '40px', height: '0.5px', background: '#c9a96e', opacity: 0.3 }}></span>
                    </div>

                    <Typography variant="h6" sx={{ color: 'rgba(245,237,216,0.55)', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 300, lineHeight: 1.7, maxWidth: '460px' }}>
                        Välkommen till bords. Varje rätt som lämnar vårt kök är ett kärleksbrev till den italienska matkulturen. Logga in för att beställa direkt till ditt bord.
                    </Typography>

                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <Button
                            variant="contained"
                            size="large"
                            href="/menu-items"
                            sx={{
                                borderRadius: '30px', // Helt runda knappar är mer premium
                                px: 4,
                                py: 1.5,
                                fontWeight: 500,
                                backgroundColor: '#b8860b',
                                color: '#140d06',
                                fontFamily: "'DM Sans', sans-serif",
                                textTransform: 'none',
                                fontSize: '14px',
                                boxShadow: '0 8px 20px rgba(184, 134, 11, 0.2)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#c9a96e',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 12px 25px rgba(184, 134, 11, 0.3)',
                                }
                            }}
                        >
                            Utforska Menyn
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            href="/categories"
                            sx={{
                                borderRadius: '30px',
                                px: 4,
                                py: 1.5,
                                fontWeight: 400,
                                color: '#c9a96e',
                                borderColor: 'rgba(201, 169, 110, 0.3)',
                                fontFamily: "'DM Sans', sans-serif",
                                textTransform: 'none',
                                fontSize: '14px',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    borderColor: '#c9a96e',
                                    backgroundColor: 'rgba(201,169,110,0.03)',
                                    transform: 'translateY(-2px)'
                                }
                            }}
                        >
                            Kategorier
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    )
}