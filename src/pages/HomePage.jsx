import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import { useBooking } from '../context/BookingContext'
import { getMenuItems } from '../api/menuItemApi'

const highlights = [
    { symbol: '✦', title: 'Färska råvaror', desc: 'Ingredienser hämtade från lokala producenter varje morgon för maximal smak och kvalitet.' },
    { symbol: '◈', title: 'Autentisk tradition', desc: 'Recept bevarade i generationer — lagade med kärlek och äkta italiensk teknik.' },
    { symbol: '◇', title: 'Enkel beställning', desc: 'Bläddra i menyn, lägg till i varukorgen och bekräfta din beställning på sekunder.' },
]

const reviews = [
    { name: 'Sofia L.', text: 'Bästa pasta jag ätit utanför Italien. Maten är fantastisk och atmosfären helt magisk.', stars: 5 },
    { name: 'Anders M.', text: 'Trattoria är vår familjs favorit. Autentisk smak, vänlig personal och perfekt läge på Avenyn.', stars: 5 },
    { name: 'Emma K.', text: 'Tiramisun var en ren dröm. Marco Rossis kök levererar varje gång — kommer definitivt tillbaka!', stars: 5 },
]

const statsData = [
    { value: 10000, suffix: '+', label: 'Nöjda gäster' },
    { value: 1987, suffix: '', label: 'Grundat år' },
    { value: 50, suffix: '+', label: 'Rätter på menyn' },
]

function StatCounter({ value, suffix, label }) {
    const [count, setCount] = useState(0)
    const [started, setStarted] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting && !started) { setStarted(true); observer.unobserve(el) } },
            { threshold: 0.5 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [started])

    useEffect(() => {
        if (!started) return
        const steps = 60
        const increment = value / steps
        let current = 0
        const timer = setInterval(() => {
            current += increment
            if (current >= value) { setCount(value); clearInterval(timer) }
            else setCount(Math.floor(current))
        }, 1800 / steps)
        return () => clearInterval(timer)
    }, [started, value])

    return (
        <Box ref={ref} sx={{ textAlign: 'center', p: { xs: 3, md: 4 } }}>
            <Typography sx={{
                fontFamily: "'Playfair Display', serif",
                color: '#c9a96e',
                fontSize: { xs: '2.4rem', md: '3rem' },
                fontWeight: 400,
                lineHeight: 1,
                mb: 0.75,
            }}>
                {value === 1987 ? count : count.toLocaleString('sv-SE')}{suffix}
            </Typography>
            <Typography sx={{
                color: 'rgba(245,237,216,0.5)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px',
                fontWeight: 300,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
            }}>
                {label}
            </Typography>
        </Box>
    )
}

const Stars = ({ count }) => (
    <span style={{ color: '#c9a96e', fontSize: '13px', letterSpacing: '2px' }}>
        {'★'.repeat(count)}
    </span>
)

export default function HomePage() {
    const { openModal } = useBooking()
    const menuRef = useRef(null)
    const [featuredItems, setFeaturedItems] = useState([])

    useEffect(() => {
        getMenuItems()
            .then(res => {
                const items = Array.isArray(res.data) ? res.data.slice(0, 3) : []
                setFeaturedItems(items)
            })
            .catch(() => {})
    }, [])

    const scrollToMenu = () => menuRef.current?.scrollIntoView({ behavior: 'smooth' })

    return (
        <Box sx={{ fontFamily: "'DM Sans', sans-serif" }}>
            {/* Hero */}
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
                <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(201,169,110,0.012) 40px, rgba(201,169,110,0.012) 41px)', pointerEvents: 'none' }} />

                <Container maxWidth="sm">
                    <Stack spacing={4} alignItems="center" textAlign="center">
                        <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c9a96e', opacity: 0.75 }}>
                            Autentisk italiensk matupplevelse
                        </div>

                        <Typography sx={{ fontFamily: "'Playfair Display', serif", color: '#f5edd8', fontWeight: 400, fontStyle: 'italic', fontSize: { xs: '3.2rem', md: '5rem' }, lineHeight: 1.05 }}>
                            Trattoria
                        </Typography>

                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Box sx={{ width: 60, height: '0.5px', bgcolor: 'rgba(201,169,110,0.4)' }} />
                            <Box sx={{ color: '#c9a96e', fontSize: '10px', opacity: 0.7 }}>✦</Box>
                            <Box sx={{ width: 60, height: '0.5px', bgcolor: 'rgba(201,169,110,0.4)' }} />
                        </Stack>

                        <Typography sx={{ color: 'rgba(245,237,216,0.6)', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 300, lineHeight: 1.85, maxWidth: '420px' }}>
                            Autentisk italiensk matlagning sedan 1987
                        </Typography>

                        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                            <Button
                                variant="contained"
                                onClick={scrollToMenu}
                                sx={{
                                    borderRadius: '30px', px: 4, py: 1.5,
                                    fontWeight: 500, backgroundColor: '#b8860b', color: '#140d06',
                                    fontFamily: "'DM Sans', sans-serif", textTransform: 'none', fontSize: '14px',
                                    boxShadow: '0 8px 24px rgba(184,134,11,0.25)', transition: 'all 0.3s ease',
                                    '&:hover': { backgroundColor: '#c9a96e', transform: 'translateY(-2px)', boxShadow: '0 14px 30px rgba(184,134,11,0.35)' }
                                }}
                            >
                                Se menyn
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={openModal}
                                sx={{
                                    borderRadius: '30px', px: 4, py: 1.5,
                                    color: '#c9a96e', borderColor: 'rgba(201,169,110,0.4)',
                                    fontFamily: "'DM Sans', sans-serif", textTransform: 'none', fontSize: '14px',
                                    transition: 'all 0.3s ease',
                                    '&:hover': { borderColor: '#c9a96e', backgroundColor: 'rgba(201,169,110,0.06)', transform: 'translateY(-2px)' }
                                }}
                            >
                                Boka bord
                            </Button>
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            {/* Stats */}
            <Box sx={{
                background: '#1a1208',
                border: '0.5px solid rgba(201,169,110,0.10)',
                borderRadius: '12px',
                mb: 3,
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                overflow: 'hidden',
            }}>
                {statsData.map((s, i) => (
                    <Box key={i} sx={{
                        borderRight: { md: i < 2 ? '0.5px solid rgba(201,169,110,0.10)' : 'none' },
                        borderBottom: { xs: i < 2 ? '0.5px solid rgba(201,169,110,0.10)' : 'none', md: 'none' },
                    }}>
                        <StatCounter value={s.value} suffix={s.suffix} label={s.label} />
                    </Box>
                ))}
            </Box>

            {/* Highlights */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                {highlights.map((h, i) => (
                    <Grid item xs={12} md={4} key={i}>
                        <Box sx={{
                            background: '#1a1208', border: '0.5px solid rgba(201,169,110,0.10)',
                            borderRadius: '12px', p: '1.75rem', textAlign: 'center', height: '100%',
                            transition: 'all 0.3s ease',
                            '&:hover': { borderColor: 'rgba(201,169,110,0.28)', transform: 'translateY(-4px)', boxShadow: '0 14px 36px rgba(0,0,0,0.35)' }
                        }}>
                            <Box sx={{ color: '#c9a96e', fontSize: '18px', mb: 2, opacity: 0.7 }}>{h.symbol}</Box>
                            <Typography sx={{ fontFamily: "'Playfair Display', serif", color: '#f5edd8', fontSize: '1.05rem', fontWeight: 400, mb: 1.25 }}>
                                {h.title}
                            </Typography>
                            <Typography sx={{ color: 'rgba(245,237,216,0.42)', fontSize: '13px', lineHeight: 1.75, fontWeight: 300, fontFamily: "'DM Sans', sans-serif" }}>
                                {h.desc}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            {/* Om oss */}
            <Box sx={{ background: '#1a1208', border: '0.5px solid rgba(201,169,110,0.10)', borderRadius: '12px', p: { xs: 3, md: 5 }, mb: 3 }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: '#c9a96e', fontSize: '11px', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', mb: 1.5, opacity: 0.8 }}>
                            Om oss
                        </Typography>
                        <Typography sx={{ fontFamily: "'Playfair Display', serif", color: '#f5edd8', fontSize: { xs: '1.6rem', md: '2.2rem' }, fontWeight: 400, fontStyle: 'italic', lineHeight: 1.2, mb: 2.5 }}>
                            En smak av Toscana i hjärtat av Göteborg
                        </Typography>
                        <Stack spacing={2}>
                            <Typography sx={{ color: 'rgba(245,237,216,0.6)', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', lineHeight: 1.9, fontWeight: 300 }}>
                                Sedan 1987 har Trattoria förvaltat en enkel men kraftfull idé: att varje gäst ska lämna mätt, glad och med en längtan att återvända. Vår kökschef Marco Rossi och hans team lagar varje rätt från grunden — med respekt för råvaran och kärlek till det italienska kökets traditioner.
                            </Typography>
                            <Typography sx={{ color: 'rgba(245,237,216,0.6)', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', lineHeight: 1.9, fontWeight: 300 }}>
                                Välkommen in. Bordet är dukat och pastan precis färsk.
                            </Typography>
                        </Stack>
                        <Button
                            component={Link}
                            to="/about"
                            sx={{
                                mt: 3, color: '#c9a96e', textTransform: 'none',
                                fontFamily: "'DM Sans', sans-serif", fontSize: '13px',
                                border: '0.5px solid rgba(201,169,110,0.3)', borderRadius: '8px', px: 3, py: 0.8,
                                '&:hover': { bgcolor: 'rgba(201,169,110,0.05)', borderColor: '#c9a96e' }
                            }}
                        >
                            Läs mer om oss →
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{
                            background: 'radial-gradient(circle at 35% 35%, rgba(201,169,110,0.12), rgba(20,13,6,0.8))',
                            border: '0.5px solid rgba(201,169,110,0.12)',
                            borderRadius: '12px',
                            p: 4,
                            textAlign: 'center',
                            aspectRatio: '4/3',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 1.5,
                        }}>
                            <Typography sx={{ fontFamily: "'Playfair Display', serif", color: '#c9a96e', fontSize: '4rem', opacity: 0.3 }}>✦</Typography>
                            <Typography sx={{ fontFamily: "'Playfair Display', serif", color: '#f5edd8', fontSize: '1.5rem', fontStyle: 'italic', opacity: 0.6 }}>
                                Dal 1987
                            </Typography>
                            <Typography sx={{ color: 'rgba(245,237,216,0.3)', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}>
                                Göteborg · Toscana
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* Utvalda rätter – scroll-mål för "Se menyn" */}
            <Box ref={menuRef} sx={{ background: '#1a1208', border: '0.5px solid rgba(201,169,110,0.10)', borderRadius: '12px', p: { xs: 3, md: 5 }, mb: 3 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: '#c9a96e', fontSize: '11px', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.8, mb: 1 }}>
                        Utvalda rätter
                    </Typography>
                    <Typography sx={{ fontFamily: "'Playfair Display', serif", color: '#f5edd8', fontSize: { xs: '1.6rem', md: '2rem' }, fontStyle: 'italic' }}>
                        Husets favoriter
                    </Typography>
                </Box>

                {featuredItems.length > 0 ? (
                    <Grid container spacing={2} sx={{ mb: 4 }}>
                        {featuredItems.map(item => (
                            <Grid item xs={12} md={4} key={item.id}>
                                <Box sx={{
                                    background: '#120d05',
                                    border: '0.5px solid rgba(201,169,110,0.12)',
                                    borderRadius: '10px',
                                    p: '1.5rem 1.75rem',
                                    textAlign: 'center',
                                    transition: 'all 0.3s ease',
                                    '&:hover': { borderColor: 'rgba(201,169,110,0.35)', transform: 'translateY(-3px)' },
                                }}>
                                    <Typography sx={{ fontFamily: "'Playfair Display', serif", color: '#f5edd8', fontSize: '1.05rem', mb: 1.5 }}>
                                        {item.name}
                                    </Typography>
                                    <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: '#c9a96e', fontSize: '1.2rem', fontWeight: 500 }}>
                                        {item.price} kr
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box sx={{ textAlign: 'center', py: 3, color: 'rgba(245,237,216,0.3)', fontSize: '14px', mb: 3 }}>
                        Laddar rätter...
                    </Box>
                )}

                <Box sx={{ textAlign: 'center' }}>
                    <Button
                        component={Link}
                        to="/menu-items"
                        sx={{
                            color: '#c9a96e', textTransform: 'none',
                            fontFamily: "'DM Sans', sans-serif", fontSize: '13px',
                            border: '0.5px solid rgba(201,169,110,0.3)', borderRadius: '8px', px: 3, py: 0.8,
                            '&:hover': { bgcolor: 'rgba(201,169,110,0.05)', borderColor: '#c9a96e' }
                        }}
                    >
                        Se hela menyn →
                    </Button>
                </Box>
            </Box>

            {/* Kundrecensioner */}
            <Box sx={{ mb: 3 }}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: '#c9a96e', fontSize: '11px', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.8, mb: 1 }}>
                        Vad våra gäster säger
                    </Typography>
                    <Typography sx={{ fontFamily: "'Playfair Display', serif", color: '#f5edd8', fontSize: { xs: '1.6rem', md: '2rem' }, fontStyle: 'italic' }}>
                        Recensioner
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    {reviews.map((r, i) => (
                        <Grid item xs={12} md={4} key={i}>
                            <Box sx={{
                                background: '#1a1208', border: '0.5px solid rgba(201,169,110,0.10)',
                                borderRadius: '12px', p: 3, height: '100%',
                                transition: 'all 0.3s',
                                '&:hover': { borderColor: 'rgba(201,169,110,0.25)', transform: 'translateY(-3px)' }
                            }}>
                                <Stars count={r.stars} />
                                <Typography sx={{ color: 'rgba(245,237,216,0.65)', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', lineHeight: 1.8, fontWeight: 300, mt: 1.5, mb: 2, fontStyle: 'italic' }}>
                                    "{r.text}"
                                </Typography>
                                <Typography sx={{ color: 'rgba(201,169,110,0.7)', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 500 }}>
                                    — {r.name}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}
