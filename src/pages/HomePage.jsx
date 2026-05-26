import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'

const highlights = [
    {
        symbol: '✦',
        title: 'Färska råvaror',
        desc: 'Ingredienser hämtade från lokala producenter varje morgon för maximal smak och kvalitet.',
    },
    {
        symbol: '◈',
        title: 'Autentisk tradition',
        desc: 'Recept bevarade i generationer — lagade med kärlek och äkta italiensk teknik.',
    },
    {
        symbol: '◇',
        title: 'Enkel beställning',
        desc: 'Bläddra i menyn, lägg till i varukorgen och bekräfta din beställning på sekunder.',
    },
]

export default function HomePage() {
    return (
        <Box sx={{ fontFamily: "'DM Sans', sans-serif" }}>
            <Box sx={{
                minHeight: '72vh',
                display: 'flex',
                alignItems: 'center',
                background: 'radial-gradient(ellipse at 50% -10%, rgba(200,169,81,0.10) 0%, transparent 55%), #1a1208',
                borderRadius: '16px',
                border: '0.5px solid rgba(201,169,110,0.10)',
                px: 4,
                py: 10,
                position: 'relative',
                overflow: 'hidden',
                mb: 3,
                boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(201,169,110,0.012) 40px, rgba(201,169,110,0.012) 41px)',
                    pointerEvents: 'none'
                }} />

                <Container maxWidth="sm">
                    <Stack spacing={4} alignItems="center" textAlign="center">
                        <div style={{
                            fontSize: '10px',
                            fontWeight: 500,
                            letterSpacing: '0.4em',
                            textTransform: 'uppercase',
                            color: '#c9a96e',
                            opacity: 0.75,
                        }}>
                            Autentisk italiensk matupplevelse
                        </div>

                        <Typography sx={{
                            fontFamily: "'Playfair Display', serif",
                            color: '#f5edd8',
                            fontWeight: 400,
                            fontStyle: 'italic',
                            fontSize: { xs: '3.2rem', md: '5rem' },
                            lineHeight: 1.05,
                        }}>
                            Trattoria
                        </Typography>

                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Box sx={{ width: 60, height: '0.5px', bgcolor: 'rgba(201,169,110,0.4)' }} />
                            <Box sx={{ color: '#c9a96e', fontSize: '10px', opacity: 0.7 }}>✦</Box>
                            <Box sx={{ width: 60, height: '0.5px', bgcolor: 'rgba(201,169,110,0.4)' }} />
                        </Stack>

                        <Typography sx={{
                            color: 'rgba(245,237,216,0.5)',
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '15px',
                            fontWeight: 300,
                            lineHeight: 1.85,
                            maxWidth: '400px',
                        }}>
                            Från Roms gator till ditt bord — tillagat med passion och färska råvaror varje dag.
                        </Typography>

                        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                            <Button
                                variant="contained"
                                component={Link}
                                to="/menu-items"
                                sx={{
                                    borderRadius: '30px',
                                    px: 4,
                                    py: 1.5,
                                    fontWeight: 500,
                                    backgroundColor: '#b8860b',
                                    color: '#140d06',
                                    fontFamily: "'DM Sans', sans-serif",
                                    textTransform: 'none',
                                    fontSize: '14px',
                                    boxShadow: '0 8px 24px rgba(184,134,11,0.25)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: '#c9a96e',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 14px 30px rgba(184,134,11,0.35)',
                                    }
                                }}
                            >
                                Utforska Menyn
                            </Button>
                            <Button
                                variant="outlined"
                                component={Link}
                                to="/categories"
                                sx={{
                                    borderRadius: '30px',
                                    px: 4,
                                    py: 1.5,
                                    color: '#c9a96e',
                                    borderColor: 'rgba(201,169,110,0.3)',
                                    fontFamily: "'DM Sans', sans-serif",
                                    textTransform: 'none',
                                    fontSize: '14px',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        borderColor: '#c9a96e',
                                        backgroundColor: 'rgba(201,169,110,0.04)',
                                        transform: 'translateY(-2px)',
                                    }
                                }}
                            >
                                Kategorier
                            </Button>
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            <Grid container spacing={2}>
                {highlights.map((h, i) => (
                    <Grid item xs={12} md={4} key={i}>
                        <Box sx={{
                            background: '#1a1208',
                            border: '0.5px solid rgba(201,169,110,0.10)',
                            borderRadius: '12px',
                            p: '1.75rem',
                            textAlign: 'center',
                            height: '100%',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                borderColor: 'rgba(201,169,110,0.28)',
                                transform: 'translateY(-4px)',
                                boxShadow: '0 14px 36px rgba(0,0,0,0.35)',
                            }
                        }}>
                            <Box sx={{ color: '#c9a96e', fontSize: '18px', mb: 2, opacity: 0.7 }}>{h.symbol}</Box>
                            <Typography sx={{
                                fontFamily: "'Playfair Display', serif",
                                color: '#f5edd8',
                                fontSize: '1.05rem',
                                fontWeight: 400,
                                mb: 1.25,
                            }}>
                                {h.title}
                            </Typography>
                            <Typography sx={{
                                color: 'rgba(245,237,216,0.42)',
                                fontSize: '13px',
                                lineHeight: 1.75,
                                fontWeight: 300,
                                fontFamily: "'DM Sans', sans-serif",
                            }}>
                                {h.desc}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
