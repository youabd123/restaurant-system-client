import { useEffect, useState } from 'react'
import { getMenuItems } from '../api/menuItemApi' // Justera importen så den matchar din filstruktur
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

export default function MenuItemsPage() {
    const [menuItems, setMenuItems] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        getMenuItems()
            .then((res) => setMenuItems(res.data))
            .catch(() => setError('Kunde inte hämta menyn. Kontrollera API-anslutningen.'))
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
                marginBottom: '0.5rem',
                fontStyle: 'italic',
                textAlign: 'center'
            }}>
                Il Menu
            </h1>
            <p style={{
                color: '#c9a96e',
                textAlign: 'center',
                fontSize: '14px',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '3rem'
            }}>
                Utforska våra italienska delikatesser
            </p>

            {menuItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '5rem 1rem', color: 'rgba(245, 237, 216, 0.3)', fontSize: '14px' }}>
                    Köket förbereder rätterna. Menyn laddas...
                </div>
            ) : (
                <Grid container spacing={3}>
                    {menuItems.map((item) => (
                        <Grid item xs={12} key={item.id}>
                            <Box sx={{
                                background: '#1f160c',
                                border: '1px solid rgba(201, 169, 110, 0.1)',
                                borderRadius: '12px',
                                padding: '1.75rem',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    borderColor: 'rgba(201, 169, 110, 0.3)',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.35)',
                                    transform: 'translateY(-2px)'
                                }
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.75rem' }}>
                                    <h3 style={{
                                        fontFamily: "'Playfair Display', serif",
                                        color: '#f5edd8',
                                        fontSize: '1.3rem',
                                        margin: 0,
                                        fontWeight: 400
                                    }}>
                                        {item.name}
                                    </h3>
                                    {/* En diskret prickad linje som binder ihop namn och pris för menyerbjudande-look */}
                                    <div style={{ flexGrow: 1, borderBottom: '1px dotted rgba(201,169,110,0.2)', mx: '1rem', alignSelf: 'stretch', transform: 'translateY(-4px)' }}></div>
                                    <span style={{
                                        fontFamily: "'Playfair Display', serif",
                                        color: '#c9a96e',
                                        fontSize: '1.25rem',
                                        fontWeight: 500
                                    }}>
                                        {item.price} kr
                                    </span>
                                </div>
                                <p style={{
                                    color: 'rgba(245, 237, 216, 0.55)',
                                    fontSize: '13.5px',
                                    margin: 0,
                                    fontWeight: 300,
                                    lineHeight: 1.6,
                                    maxWidth: '85%'
                                }}>
                                    {item.description || 'Tillagad med färska italienska råvaror och mycket kärlek.'}
                                </p>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    )
}