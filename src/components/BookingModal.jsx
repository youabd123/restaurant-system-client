import { useState } from 'react'
import { useBooking } from '../context/BookingContext'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'

const inputSx = {
    '& .MuiOutlinedInput-root': {
        fontFamily: "'DM Sans', sans-serif",
        color: '#f5edd8',
        fontSize: '14px',
        '& fieldset': { borderColor: 'rgba(201,169,110,0.25)' },
        '&:hover fieldset': { borderColor: 'rgba(201,169,110,0.5)' },
        '&.Mui-focused fieldset': { borderColor: '#c9a96e' },
    },
    '& .MuiInputLabel-root': {
        fontFamily: "'DM Sans', sans-serif",
        color: 'rgba(245,237,216,0.4)',
        fontSize: '13px',
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#c9a96e' },
    '& input': { colorScheme: 'dark' },
}

export default function BookingModal() {
    const { open, closeModal } = useBooking()
    const [form, setForm] = useState({ name: '', email: '', date: '', time: '', guests: '2' })
    const [submitted, setSubmitted] = useState(false)

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
                                mt: 3,
                                color: '#c9a96e',
                                textTransform: 'none',
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: '13px',
                                border: '0.5px solid rgba(201,169,110,0.3)',
                                borderRadius: '8px',
                                px: 3,
                                '&:hover': { bgcolor: 'rgba(201,169,110,0.05)', borderColor: '#c9a96e' },
                            }}
                        >
                            Stäng
                        </Button>
                    </Box>
                ) : (
                    <Stack component="form" onSubmit={handleSubmit} spacing={2} sx={{ mt: 1 }}>
                        <TextField label="Namn" name="name" value={form.name} onChange={handleChange} required size="small" sx={inputSx} />
                        <TextField label="E-post" name="email" type="email" value={form.email} onChange={handleChange} required size="small" sx={inputSx} />
                        <TextField label="Datum" name="date" type="date" value={form.date} onChange={handleChange} required size="small" InputLabelProps={{ shrink: true }} sx={inputSx} />
                        <TextField label="Tid" name="time" type="time" value={form.time} onChange={handleChange} required size="small" InputLabelProps={{ shrink: true }} sx={inputSx} />
                        <TextField
                            label="Antal gäster"
                            name="guests"
                            type="number"
                            value={form.guests}
                            onChange={handleChange}
                            required
                            size="small"
                            inputProps={{ min: 1, max: 20 }}
                            sx={inputSx}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 0.5,
                                backgroundColor: '#b8860b',
                                color: '#140d06',
                                fontFamily: "'DM Sans', sans-serif",
                                textTransform: 'none',
                                fontWeight: 500,
                                fontSize: '14px',
                                borderRadius: '8px',
                                py: 1.2,
                                boxShadow: '0 4px 16px rgba(184,134,11,0.2)',
                                '&:hover': { backgroundColor: '#c9a96e' },
                            }}
                        >
                            Bekräfta bokning
                        </Button>
                    </Stack>
                )}
            </DialogContent>
        </Dialog>
    )
}
