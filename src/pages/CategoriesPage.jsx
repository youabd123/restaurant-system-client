import { useEffect, useState } from 'react'
import { getCategories } from '../api/categoryApi'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'

function CategoryMonogram({ name }) {
    return (
        <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '10px',
            background: 'rgba(201,169,110,0.07)',
            border: '0.5px solid rgba(201,169,110,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.4rem',
            color: '#c9a96e',
            fontStyle: 'italic',
            flexShrink: 0,
            transition: 'all 0.3s',
        }}>
            {name?.charAt(0)?.toUpperCase() ?? '?'}
        </div>
    )
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getCategories()
            .then((res) => setCategories(res.data))
            .catch(() => setError('Kunde inte hämta kategorier.'))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return (
        <Box display="flex" justifyContent="center" mt={8}>
            <CircularProgress sx={{ color: '#c9a96e' }} />
        </Box>
    )

    if (error) return (
        <Box sx={{ textAlign: 'center', mt: 8, color: '#f09595', fontFamily: "'DM Sans', sans-serif", fontSize: '14px' }}>
            {error}
        </Box>
    )

    return (
        <Box sx={{ fontFamily: "'DM Sans', sans-serif" }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Box sx={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c9a96e', opacity: 0.7, mb: 1.5 }}>
                    Vår menystruktur
                </Box>
                <Box sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '2.2rem',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    color: '#f5edd8',
                    mb: 1.5,
                }}>
                    Kategorier
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
                    <Box sx={{ width: 50, height: '0.5px', bgcolor: 'rgba(201,169,110,0.3)' }} />
                    <Box sx={{ color: '#c9a96e', fontSize: '9px', opacity: 0.5 }}>✦</Box>
                    <Box sx={{ width: 50, height: '0.5px', bgcolor: 'rgba(201,169,110,0.3)' }} />
                </Box>
            </Box>

            <Grid container spacing={2.5}>
                {categories.map((cat) => (
                    <Grid item xs={12} sm={6} key={cat.id}>
                        <Box sx={{
                            background: '#1a1208',
                            border: '0.5px solid rgba(201,169,110,0.10)',
                            borderRadius: '12px',
                            padding: '1.4rem 1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.25rem',
                            transition: 'all 0.3s cubic-bezier(0.25,0.8,0.25,1)',
                            cursor: 'default',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                borderColor: 'rgba(201,169,110,0.28)',
                                boxShadow: '0 14px 36px rgba(0,0,0,0.4)',
                                '& .monogram': {
                                    background: 'rgba(201,169,110,0.14)',
                                    borderColor: 'rgba(201,169,110,0.35)',
                                }
                            }
                        }}>
                            <div className="monogram" style={{
                                width: '52px',
                                height: '52px',
                                borderRadius: '10px',
                                background: 'rgba(201,169,110,0.07)',
                                border: '0.5px solid rgba(201,169,110,0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontFamily: "'Playfair Display', serif",
                                fontSize: '1.4rem',
                                color: '#c9a96e',
                                fontStyle: 'italic',
                                flexShrink: 0,
                                transition: 'all 0.3s',
                            }}>
                                {cat.name?.charAt(0)?.toUpperCase() ?? '?'}
                            </div>

                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{
                                    fontFamily: "'Playfair Display', serif",
                                    color: '#f5edd8',
                                    fontSize: '1.1rem',
                                    fontWeight: 400,
                                    marginBottom: '5px',
                                }}>
                                    {cat.name}
                                </div>
                                <div style={{
                                    color: 'rgba(245,237,216,0.42)',
                                    fontSize: '13px',
                                    fontWeight: 300,
                                    lineHeight: 1.6,
                                    fontFamily: "'DM Sans', sans-serif",
                                }}>
                                    {cat.description || 'Traditionellt tillagade råvaror av högsta kvalitet.'}
                                </div>
                            </div>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
