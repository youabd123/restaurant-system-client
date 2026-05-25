import { useEffect, useState } from 'react'
import { getCategories } from '../api/categoryApi'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

const categoryEmojis = {
    1: '🍕', 2: '🍝', 3: '🥗', 4: '🍞', 5: '🥩', 6: '🍮', 7: '🥤', 8: '🍷'
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        getCategories()
            .then((res) => setCategories(res.data))
            .catch(() => setError('Kunde inte hämta kategorier'))
    }, [])

    if (error) return (
        <Typography style={{ color: '#f09595', textAlign: 'center', marginTop: '4rem', fontFamily: "'DM Sans', sans-serif" }}>
            {error}
        </Typography>
    )

    return (
        <Box sx={{ fontFamily: "'DM Sans', sans-serif" }}>
            <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2.2rem',
                fontWeight: 400,
                color: '#f5edd8',
                marginBottom: '2.5rem',
                borderBottom: '1px solid rgba(201, 169, 110, 0.1)',
                paddingBottom: '1rem',
                fontStyle: 'italic',
                textAlign: 'center'
            }}>
                Vår Menystruktur
            </h1>

            <Grid container spacing={3}>
                {categories.map((cat) => {
                    const emoji = categoryEmojis[cat.id] || '🍽️'
                    return (
                        <Grid item xs={12} sm={6} key={cat.id}>
                            <Box sx={{
                                background: '#1f160c',
                                border: '1px solid rgba(201, 169, 110, 0.1)',
                                borderRadius: '12px',
                                padding: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1.25rem',
                                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    borderColor: 'rgba(201, 169, 110, 0.3)',
                                    boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
                                    '& .emoji-bg': { background: 'rgba(201, 169, 110, 0.2)' }
                                }
                            }}>
                                <div
                                    className="emoji-bg"
                                    style={{
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: '10px',
                                        background: 'rgba(201, 169, 110, 0.06)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '24px',
                                        transition: 'background 0.3s'
                                    }}
                                >
                                    {emoji}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#f5edd8', fontSize: '1.2rem', margin: '0 0 4px 0', fontWeight: 400 }}>
                                        {cat.name}
                                    </h3>
                                    <p style={{ color: 'rgba(245, 237, 216, 0.5)', fontSize: '13px', margin: 0, fontWeight: 300, lineHeight: 1.5 }}>
                                        {cat.description || 'Traditionellt tillagade råvaror av högsta kvalitet.'}
                                    </p>
                                </div>
                            </Box>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}