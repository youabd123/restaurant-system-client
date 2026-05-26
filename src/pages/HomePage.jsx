import { useState, useEffect } from 'react'
import { useBooking } from '../context/BookingContext'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'

const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=DM+Sans:wght@300;400;500&display=swap');

    .bm-field { display: flex; flex-direction: column; gap: 5px; }
    .bm-label { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(245,237,216,0.35); }
    .bm-input {
        background: #120d05;
        border: 0.5px solid rgba(201,169,110,0.2);
        border-radius: 8px;
        padding: 0.6rem 0.85rem;
        font-family: 'DM Sans', sans-serif;
        font-size: 13px;
        color: #f5edd8;
        outline: none;
        transition: border-color 0.2s;
        width: 100%;
        box-sizing: border-box;
    }
    .bm-input::placeholder { color: rgba(245,237,216,0.25); }
    .bm-input:focus { border-color: #c9a96e; }
    .bm-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
`

export default function BookingModal() {
    const { open, closeModal } = useBooking()
    const [form, setForm] = useState({ name: '', email: '', date: '', time: '', guests: '2' })
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        const handleKeyDown = (e) => { if (e.key === 'Escape') closeModal() }
        if (open) window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [open, closeModal])

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
    }

    const handleClose = () => {
        closeModal()
        setTimeout(() => {
            setSubmitted(false)
            setForm({ name: '', email: '', date: '', time: '', guests: '2' })
        }, 300)
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    bgcolor: '#1a1208',
                    border: '0.5px solid rgba(201,169,110,0.2)',
                    borderRadius: '16px',
                    color: '#f5edd8',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
                }
            }}
        >
            <style>{styles}</style>

            <DialogTitle sx={{ pb: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.5rem', color: '#f5edd8' }}>
                    Boka bord
                </Typography>
                <IconButton onClick={handleClose} size="small" sx={{ color: 'rgba(245,237,216,0.35)', '&:hover': { color: '#f5edd8', bgcolor: 'transparent' } }}>
                    <span style={{ fontSize: '18px', lineHeight: 1 }}>✕</span>
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 2 }}>
                {submitted ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography sx={{ color: '#c9a96e', fontSize: '2.5rem', mb: 2 }}>✦</Typography>
                        <Typography sx={{ fontFamily: "'Playfair Display', serif", color: '#f5edd8', fontSize: '1.3rem', mb: 1.5 }}>
                            Tack, {form.name}!
                        </Typography>
                        <Typography sx={{ color: 'rgba(245,237,216,0.5)', fontSize: '13px', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>
                            Din bordsbokning är mottagen. Vi bekräftar via e-post inom kort.
                        </Typography>
                        <Button
                            onClick={handleClose}
                            sx={{
                                mt: 3, color: '#c9a96e', textTransform: 'none',
                                fontFamily: "'DM Sans', sans-serif", fontSize: '13px',
                                border: '0.5px solid rgba(201,169,110,0.3)', borderRadius: '8px', px: 3,
                                '&:hover': { bgcolor: 'rgba(201,169,110,0.05)', borderColor: '#c9a96e' },
                            }}
                        >
                            Stäng
                        </Button>
                    </Box>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={1.5} sx={{ mt: 1 }}>
                            <div className="bm-field">
                                <label className="bm-label">Namn</label>
                                <input className="bm-input" name="name" value={form.name} onChange={handleChange} required placeholder="Ditt namn" autoComplete="off" />
                            </div>
                            <div className="bm-field">
                                <label className="bm-label">E-post</label>
                                <input className="bm-input" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="din@email.se" autoComplete="off" />
                            </div>
                            <div className="bm-row">
                                <div className="bm-field">
                                    <label className="bm-label">Datum</label>
                                    <input className="bm-input" name="date" value={form.date} onChange={handleChange} required placeholder="ÅÅÅÅ-MM-DD" autoComplete="off" />
                                </div>
                                <div className="bm-field">
                                    <label className="bm-label">Tid</label>
                                    <input className="bm-input" name="time" value={form.time} onChange={handleChange} required placeholder="HH:MM" autoComplete="off" />
                                </div>
                            </div>
                            <div className="bm-field">
                                <label className="bm-label">Antal gäster</label>
                                <input className="bm-input" name="guests" type="number" min="1" max="20" value={form.guests} onChange={handleChange} required autoComplete="off" />
                            </div>
                            <button
                                type="submit"
                                style={{
                                    marginTop: '8px',
                                    background: '#b8860b',
                                    color: '#140d06',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '0.75rem',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    fontFamily: "'DM Sans', sans-serif",
                                    cursor: 'pointer',
                                    width: '100%',
                                    transition: 'background 0.2s',
                                }}
                                onMouseEnter={e => e.target.style.background = '#c9a96e'}
                                onMouseLeave={e => e.target.style.background = '#b8860b'}
                            >
                                Bekräfta bokning
                            </button>
                        </Stack>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    )
}