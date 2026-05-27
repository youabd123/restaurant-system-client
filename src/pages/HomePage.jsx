import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'
import { getMenuItems } from '../api/menuItemApi'
import { formatPrice } from '../Helpers/formatPrice'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

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
        <div ref={ref} style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", color: '#c9a96e', fontSize: '2.8rem', fontWeight: 400, lineHeight: 1, marginBottom: '0.5rem' }}>
                {value === 1987 ? count : count.toLocaleString('sv-SE')}{suffix}
            </div>
            <div style={{ color: 'rgba(245,237,216,0.5)', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 300, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {label}
            </div>
        </div>
    )
}

const Stars = ({ count }) => (
    <span style={{ color: '#c9a96e', fontSize: '10px', letterSpacing: '1px' }}>{'★'.repeat(count)}</span>
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
            .catch(() => { })
    }, [])

    const scrollToMenu = () => menuRef.current?.scrollIntoView({ behavior: 'smooth' })

    return (
        <Box sx={{ fontFamily: "'DM Sans', sans-serif" }}>

            {/* Hero */}
            <Box sx={{
                minHeight: '72vh', display: 'flex', alignItems: 'center',
                background: 'radial-gradient(ellipse at 50% -10%, rgba(200,169,81,0.10) 0%, transparent 55%), #1a1208',
                borderRadius: '16px', border: '0.5px solid rgba(201,169,110,0.10)',
                px: 4, py: 10, position: 'relative', overflow: 'hidden', mb: 3,
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
                            <Button onClick={scrollToMenu} variant="contained" sx={{ borderRadius: '30px', px: 4, py: 1.5, fontWeight: 500, backgroundColor: '#b8860b', color: '#140d06', fontFamily: "'DM Sans', sans-serif", textTransform: 'none', fontSize: '14px', boxShadow: '0 8px 24px rgba(184,134,11,0.25)', '&:hover': { backgroundColor: '#c9a96e', transform: 'translateY(-2px)' } }}>
                                Se menyn
                            </Button>
                            <Button onClick={openModal} variant="outlined" sx={{ borderRadius: '30px', px: 4, py: 1.5, color: '#c9a96e', borderColor: 'rgba(201,169,110,0.4)', fontFamily: "'DM Sans', sans-serif", textTransform: 'none', fontSize: '14px', '&:hover': { borderColor: '#c9a96e', backgroundColor: 'rgba(201,169,110,0.06)', transform: 'translateY(-2px)' } }}>
                                Boka bord
                            </Button>
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            {/* Stats */}
            <Box sx={{ background: '#1a1208', border: '0.5px solid rgba(201,169,110,0.10)', borderRadius: '12px', mb: 3, display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, overflow: 'hidden' }}>
                {statsData.map((s, i) => (
                    <Box key={i} sx={{ borderRight: { md: i < 2 ? '0.5px solid rgba(201,169,110,0.10)' : 'none' }, borderBottom: { xs: i < 2 ? '0.5px solid rgba(201,169,110,0.10)' : 'none', md: 'none' } }}>
                        <StatCounter value={s.value} suffix={s.suffix} label={s.label} />
                    </Box>
                ))}
            </Box>

            {/* Utvalda rätter */}
            <Box ref={menuRef} sx={{ background: '#1a1208', border: '0.5px solid rgba(201,169,110,0.10)', borderRadius: '12px', p: { xs: 2.5, md: 3.5 }, mb: 3 }}>
                <Box sx={{ textAlign: 'center', mb: 2.5 }}>
                    <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: '#c9a96e', fontSize: '11px', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.8, mb: 1 }}>
                        Utvalda rätter
                    </Typography>
                    <Typography sx={{ fontFamily: "'Playfair Display', serif", color: '#f5edd8', fontSize: { xs: '1.3rem', md: '1.6rem' }, fontStyle: 'italic' }}>
                        Husets favoriter
                    </Typography>
                </Box>
                {featuredItems.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '1.5rem' }}>
                        {featuredItems.map(item => (
                            <div key={item.id} style={{ background: '#120d05', border: '0.5px solid rgba(201,169,110,0.12)', borderRadius: '10px', padding: '0.75rem 1.25rem', textAlign: 'center', transition: 'all 0.3s ease' }}>
                                <div style={{ fontFamily: "'Playfair Display', serif", color: '#f5edd8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{item.name}</div>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", color: '#c9a96e', fontSize: '0.95rem', fontWeight: 500 }}>{formatPrice(item.price)}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <Box sx={{ textAlign: 'center', py: 2, color: 'rgba(245,237,216,0.3)', fontSize: '13px', mb: 2 }}>Laddar rätter...</Box>
                )}
                <Box sx={{ textAlign: 'center' }}>
                    <Button component={Link} to="/menu-items" sx={{ color: '#c9a96e', textTransform: 'none', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', border: '0.5px solid rgba(201,169,110,0.3)', borderRadius: '8px', px: 3, py: 0.8, '&:hover': { bgcolor: 'rgba(201,169,110,0.05)', borderColor: '#c9a96e' } }}>
                        Se hela menyn →
                    </Button>
                </Box>
            </Box>

            {/* Highlights */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '1.5rem' }}>
                {highlights.map((h, i) => (
                    <div key={i} style={{ background: '#1a1208', border: '0.5px solid rgba(201,169,110,0.10)', borderRadius: '12px', padding: '0.75rem 1rem', textAlign: 'center' }}>
                        <div style={{ color: '#c9a96e', fontSize: '14px', marginBottom: '0.5rem', opacity: 0.7 }}>{h.symbol}</div>
                        <div style={{ fontFamily: "'Playfair Display', serif", color: '#f5edd8', fontSize: '0.875rem', marginBottom: '0.4rem' }}>{h.title}</div>
                        <div style={{ color: 'rgba(245,237,216,0.42)', fontSize: '11px', lineHeight: 1.65, fontWeight: 300, fontFamily: "'DM Sans', sans-serif" }}>{h.desc}</div>
                    </div>
                ))}
            </div>

            {/* Om oss */}
            <Box sx={{ background: '#1a1208', border: '0.5px solid rgba(201,169,110,0.10)', borderRadius: '12px', p: { xs: 2, md: 3 }, mb: 3 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", color: '#c9a96e', fontSize: '11px', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.75rem', opacity: 0.8 }}>Om oss</div>
                        <div style={{ fontFamily: "'Playfair Display', serif", color: '#f5edd8', fontSize: '1.4rem', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.2, marginBottom: '1rem' }}>
                            En smak av Toscana i hjärtat av Göteborg
                        </div>
                        <div style={{ color: 'rgba(245,237,216,0.6)', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', lineHeight: 1.8, fontWeight: 300, marginBottom: '0.75rem' }}>
                            Sedan 1987 har Trattoria förvaltat en enkel men kraftfull idé: att varje gäst ska lämna mätt, glad och med en längtan att återvända. Vår kökschef Marco Rossi och hans team lagar varje rätt från grunden.
                        </div>
                        <Button component={Link} to="/about" sx={{ mt: 1, color: '#c9a96e', textTransform: 'none', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', border: '0.5px solid rgba(201,169,110,0.3)', borderRadius: '8px', px: 3, py: 0.8, '&:hover': { bgcolor: 'rgba(201,169,110,0.05)', borderColor: '#c9a96e' } }}>
                            Läs mer om oss →
                        </Button>
                    </div>
                    <div style={{ background: 'radial-gradient(circle at 35% 35%, rgba(201,169,110,0.12), rgba(20,13,6,0.8))', border: '0.5px solid rgba(201,169,110,0.12)', borderRadius: '12px', padding: '3rem', textAlign: 'center' }}>
                        <div style={{ fontFamily: "'Playfair Display', serif", color: '#c9a96e', fontSize: '3rem', opacity: 0.3 }}>✦</div>
                        <div style={{ fontFamily: "'Playfair Display', serif", color: '#f5edd8', fontSize: '1.3rem', fontStyle: 'italic', opacity: 0.6, marginTop: '0.75rem' }}>Dal 1987</div>
                        <div style={{ color: 'rgba(245,237,216,0.3)', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif", marginTop: '0.5rem' }}>Göteborg · Toscana</div>
                    </div>
                </div>
            </Box>

            {/* Recensioner */}
            <Box sx={{ mb: 3 }}>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: '#c9a96e', fontSize: '11px', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.8, mb: 1 }}>
                        Vad våra gäster säger
                    </Typography>
                    <Typography sx={{ fontFamily: "'Playfair Display', serif", color: '#f5edd8', fontSize: { xs: '1.3rem', md: '1.7rem' }, fontStyle: 'italic' }}>
                        Recensioner
                    </Typography>
                </Box>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    {reviews.map((r, i) => (
                        <div key={i} style={{ background: '#1a1208', border: '0.5px solid rgba(201,169,110,0.10)', borderRadius: '12px', padding: '1.25rem' }}>
                            <Stars count={r.stars} />
                            <div style={{ color: 'rgba(245,237,216,0.65)', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', lineHeight: 1.6, fontWeight: 300, marginTop: '0.75rem', marginBottom: '0.75rem', fontStyle: 'italic' }}>
                                "{r.text}"
                            </div>
                            <div style={{ color: 'rgba(201,169,110,0.7)', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 500 }}>
                                — {r.name}
                            </div>
                        </div>
                    ))}
                </div>
            </Box>
        </Box>
    )
}