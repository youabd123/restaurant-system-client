import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'

const InfoRow = ({ label, value }) => (
    <Box sx={{ display: 'flex', gap: 2, py: 1.25, borderBottom: '0.5px solid rgba(201,169,110,0.08)' }}>
        <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(201,169,110,0.6)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.05em', minWidth: 90, pt: 0.1 }}>
            {label}
        </Typography>
        <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(245,237,216,0.7)', fontSize: '14px', lineHeight: 1.7 }}>
            {value}
        </Typography>
    </Box>
)

export default function ContactPage() {
    return (
        <Box sx={{ fontFamily: "'DM Sans', sans-serif" }}>
            {/* Hero */}
            <Box sx={{
                background: 'radial-gradient(ellipse at 50% -10%, rgba(200,169,81,0.10) 0%, transparent 55%), #1a1208',
                borderRadius: '16px',
                border: '0.5px solid rgba(201,169,110,0.10)',
                px: { xs: 3, md: 6 },
                py: { xs: 6, md: 8 },
                textAlign: 'center',
                mb: 3,
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(201,169,110,0.012) 40px, rgba(201,169,110,0.012) 41px)', pointerEvents: 'none' }} />
                <Typography sx={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c9a96e', opacity: 0.75, mb: 2, fontFamily: "'DM Sans', sans-serif" }}>
                    Hitta oss
                </Typography>
                <Typography sx={{ fontFamily: "'Playfair Display', serif", color: '#f5edd8', fontSize: { xs: '2.4rem', md: '3.5rem' }, fontWeight: 400, fontStyle: 'italic', lineHeight: 1.1 }}>
                    Kontakt
                </Typography>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ my: 3, justifyContent: 'center' }}>
                    <Box sx={{ width: 50, height: '0.5px', bgcolor: 'rgba(201,169,110,0.4)' }} />
                    <Box sx={{ color: '#c9a96e', fontSize: '10px', opacity: 0.7 }}>✦</Box>
                    <Box sx={{ width: 50, height: '0.5px', bgcolor: 'rgba(201,169,110,0.4)' }} />
                </Stack>
                <Typography sx={{ color: 'rgba(245,237,216,0.5)', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 300, lineHeight: 1.85 }}>
                    Vi ser fram emot att välkomna dig.
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {/* Info */}
                <Grid item xs={12} md={5}>
                    <Box sx={{ background: '#1a1208', border: '0.5px solid rgba(201,169,110,0.10)', borderRadius: '12px', p: { xs: 3, md: 4 }, height: '100%' }}>
                        <Typography sx={{ fontFamily: "'Playfair Display', serif", color: '#f5edd8', fontSize: '1.3rem', fontStyle: 'italic', mb: 3 }}>
                            Besök oss
                        </Typography>

                        <Stack spacing={0}>
                            <InfoRow label="Adress" value="Avenyn 12, 411 36 Göteborg" />
                            <InfoRow label="Telefon" value="031-123 456" />
                            <InfoRow label="E-post" value="info@trattoria.se" />
                        </Stack>

                        <Typography sx={{ fontFamily: "'Playfair Display', serif", color: '#f5edd8', fontSize: '1.1rem', fontStyle: 'italic', mt: 3.5, mb: 2 }}>
                            Öppettider
                        </Typography>

                        <Stack spacing={0}>
                            <InfoRow label="Mån–Fre" value="11:00 – 22:00" />
                            <InfoRow label="Lör–Sön" value="12:00 – 23:00" />
                        </Stack>

                        <Box sx={{ mt: 3, pt: 2.5, borderTop: '0.5px solid rgba(201,169,110,0.1)' }}>
                            <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(245,237,216,0.35)', fontSize: '12px', lineHeight: 1.7 }}>
                                Köket stänger 30 minuter före restaurangens stängningstid. Bokning rekommenderas för sällskap om 6+ personer.
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                {/* Karta */}
                <Grid item xs={12} md={7}>
                    <Box sx={{ background: '#1a1208', border: '0.5px solid rgba(201,169,110,0.10)', borderRadius: '12px', overflow: 'hidden', height: { xs: 300, md: '100%' }, minHeight: 300 }}>
                        <iframe
                            title="Trattoria karta"
                            src="https://maps.google.com/maps?q=Avenyn+12+Gothenburg+Sweden&output=embed&hl=sv"
                            width="100%"
                            height="100%"
                            style={{ border: 0, display: 'block', minHeight: 300, filter: 'invert(90%) hue-rotate(180deg)' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </Box>
                </Grid>
            </Grid>

            {/* Extra sektion */}
            <Box sx={{ background: '#1a1208', border: '0.5px solid rgba(201,169,110,0.10)', borderRadius: '12px', p: { xs: 3, md: 4 }, mt: 3, textAlign: 'center' }}>
                <Typography sx={{ fontFamily: "'Playfair Display', serif", color: '#f5edd8', fontSize: '1.2rem', fontStyle: 'italic', mb: 1.5 }}>
                    Frågor eller gruppreservationer?
                </Typography>
                <Typography sx={{ color: 'rgba(245,237,216,0.5)', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', lineHeight: 1.8 }}>
                    Kontakta oss gärna via e-post på{' '}
                    <Box component="a" href="mailto:info@trattoria.se" sx={{ color: '#c9a96e', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                        info@trattoria.se
                    </Box>
                    {' '}eller ring oss på{' '}
                    <Box component="a" href="tel:031123456" sx={{ color: '#c9a96e', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                        031-123 456
                    </Box>
                    . Vi svarar vardagar 10:00–18:00.
                </Typography>
            </Box>
        </Box>
    )
}
