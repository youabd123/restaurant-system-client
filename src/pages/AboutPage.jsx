import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'

const Divider = () => (
    <Stack direction="row" alignItems="center" spacing={2} sx={{ my: 5, justifyContent: 'center' }}>
        <Box sx={{ width: 60, height: '0.5px', bgcolor: 'rgba(201,169,110,0.3)' }} />
        <Box sx={{ color: '#c9a96e', fontSize: '10px', opacity: 0.6 }}>✦</Box>
        <Box sx={{ width: 60, height: '0.5px', bgcolor: 'rgba(201,169,110,0.3)' }} />
    </Stack>
)

export default function AboutPage() {
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
                    Vår historia
                </Typography>
                <Typography sx={{ fontFamily: "'Playfair Display', serif", color: '#f5edd8', fontSize: { xs: '2.4rem', md: '3.5rem' }, fontWeight: 400, fontStyle: 'italic', lineHeight: 1.1 }}>
                    Om Trattoria
                </Typography>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ my: 3, justifyContent: 'center' }}>
                    <Box sx={{ width: 50, height: '0.5px', bgcolor: 'rgba(201,169,110,0.4)' }} />
                    <Box sx={{ color: '#c9a96e', fontSize: '10px', opacity: 0.7 }}>✦</Box>
                    <Box sx={{ width: 50, height: '0.5px', bgcolor: 'rgba(201,169,110,0.4)' }} />
                </Stack>
                <Typography sx={{ color: 'rgba(245,237,216,0.5)', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 300, lineHeight: 1.85, maxWidth: '480px', mx: 'auto' }}>
                    Passion, tradition och kärlek till mat — sedan 1987.
                </Typography>
            </Box>

            {/* Historia */}
            <Box sx={{ background: '#1a1208', border: '0.5px solid rgba(201,169,110,0.10)', borderRadius: '12px', p: { xs: 3, md: 5 }, mb: 3 }}>
                <Typography sx={{ fontFamily: "'Playfair Display', serif", color: '#c9a96e', fontSize: '11px', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', mb: 2, opacity: 0.8 }}>
                    Vår berättelse
                </Typography>
                <Typography sx={{ fontFamily: "'Playfair Display', serif", color: '#f5edd8', fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 400, fontStyle: 'italic', mb: 3, lineHeight: 1.25 }}>
                    Från Toscana till Göteborg
                </Typography>
                <Stack spacing={2.5}>
                    <Typography sx={{ color: 'rgba(245,237,216,0.65)', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', lineHeight: 1.9, fontWeight: 300 }}>
                        Trattoria grundades 1987 av familjen Rossi, som lämnade sin hemby utanför Florens med en dröm om att dela Toscanas smaker med världen. Med bara ett litet kök, ett hanterat recepthäfte och oändlig passion öppnade de dörrarna till det som skulle bli Göteborgs mest älskade italienska restaurang.
                    </Typography>
                    <Typography sx={{ color: 'rgba(245,237,216,0.65)', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', lineHeight: 1.9, fontWeight: 300 }}>
                        Under decennierna har vi välkomnat generationer av gäster — från första dejter till bröllop, från familjemiddagar till högtidsfiranden. Varje måltid hos oss är ett löfte om autenticitet: råvaror hämtade från lokala producenter, pasta handgjord varje morgon och sås som sjudit i timmar.
                    </Typography>
                    <Typography sx={{ color: 'rgba(245,237,216,0.65)', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', lineHeight: 1.9, fontWeight: 300 }}>
                        Idag, nästan fyra decennier senare, lever samma anda kvar i varje rätt vi serverar. Trattoria är inte bara en restaurang — det är ett hem.
                    </Typography>
                </Stack>
            </Box>

            {/* Kökschef */}
            <Box sx={{ background: '#1a1208', border: '0.5px solid rgba(201,169,110,0.10)', borderRadius: '12px', p: { xs: 3, md: 5 }, mb: 3 }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <Box sx={{
                            width: { xs: 120, md: '100%' },
                            aspectRatio: '1',
                            maxWidth: 200,
                            mx: { xs: 'auto', md: 0 },
                            borderRadius: '50%',
                            border: '2px solid rgba(201,169,110,0.25)',
                            background: 'radial-gradient(circle at 35% 35%, rgba(201,169,110,0.15), rgba(20,13,6,0.8))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Typography sx={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#c9a96e', fontSize: { xs: '3rem', md: '4rem' }, opacity: 0.6 }}>MR</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: '#c9a96e', fontSize: '11px', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', mb: 1, opacity: 0.8 }}>
                            Kökschef
                        </Typography>
                        <Typography sx={{ fontFamily: "'Playfair Display', serif", color: '#f5edd8', fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 400, fontStyle: 'italic', mb: 2 }}>
                            Marco Rossi
                        </Typography>
                        <Stack spacing={2}>
                            <Typography sx={{ color: 'rgba(245,237,216,0.65)', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', lineHeight: 1.9, fontWeight: 300 }}>
                                Marco Rossi växte upp i ett kök i Lucca, Toscana, där han lärde sig matlagningens konst av sin farmor. Han utbildade sig på Cordon Bleu i Milano och arbetade på flera stjärnkrogar i Rom och Florens innan han tog över Trattoria 2005.
                            </Typography>
                            <Typography sx={{ color: 'rgba(245,237,216,0.65)', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', lineHeight: 1.9, fontWeight: 300 }}>
                                Hans filosofi är enkel: använd de bästa råvarorna, respektera traditionen och laga med kärlek. Hans signaturrätter — den handgjorda pastan och den långsamt kokta ossobuco — är legendariska bland Göteborgs matälskare.
                            </Typography>
                        </Stack>
                        <Box sx={{ mt: 2, display: 'inline-block', border: '0.5px solid rgba(201,169,110,0.2)', borderRadius: '6px', px: 2, py: 0.75 }}>
                            <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(201,169,110,0.7)', fontSize: '12px', letterSpacing: '0.05em' }}>
                                "Maten ska smaka som ett minne."
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* Filosofi */}
            <Box sx={{ background: '#1a1208', border: '0.5px solid rgba(201,169,110,0.10)', borderRadius: '12px', p: { xs: 3, md: 5 }, mb: 3 }}>
                <Typography sx={{ fontFamily: "'Playfair Display', serif", color: '#c9a96e', fontSize: '11px', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', mb: 2, opacity: 0.8 }}>
                    Vår filosofi
                </Typography>
                <Typography sx={{ fontFamily: "'Playfair Display', serif", color: '#f5edd8', fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 400, fontStyle: 'italic', mb: 3 }}>
                    Färska råvaror, äkta traditioner
                </Typography>
                <Grid container spacing={3}>
                    {[
                        { symbol: '✦', title: 'Lokalt & färskt', text: 'Vi samarbetar med lokala producenter och hämtar våra råvaror varje morgon. Säsong och kvalitet styr alltid menyn.' },
                        { symbol: '◈', title: 'Handgjord pasta', text: 'Varje form av pasta rullas och skärs för hand dagligen i vårt kök. Det tar tid — men skillnaden märks i varje tugga.' },
                        { symbol: '◇', title: 'Italiensk tradition', text: 'Våra recept har ärvts i generationer. Vi lagar som man alltid har gjort i Toscana — utan genvägar.' },
                    ].map((item, i) => (
                        <Grid item xs={12} md={4} key={i}>
                            <Box sx={{ border: '0.5px solid rgba(201,169,110,0.08)', borderRadius: '10px', p: 3, height: '100%', transition: 'all 0.3s', '&:hover': { borderColor: 'rgba(201,169,110,0.25)', transform: 'translateY(-3px)' } }}>
                                <Typography sx={{ color: '#c9a96e', fontSize: '16px', mb: 1.5, opacity: 0.7 }}>{item.symbol}</Typography>
                                <Typography sx={{ fontFamily: "'Playfair Display', serif", color: '#f5edd8', fontSize: '1rem', mb: 1 }}>{item.title}</Typography>
                                <Typography sx={{ color: 'rgba(245,237,216,0.45)', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', lineHeight: 1.75, fontWeight: 300 }}>{item.text}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}
