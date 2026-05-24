import { useEffect, useState } from 'react'
import { getOrders } from '../api/orderApi'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

export default function OrdersPage() {
    const [orders, setOrders] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        getOrders()
            .then((res) => setOrders(res.data))
            .catch(() => setError('Kunde inte hämta ordrar'))
    }, [])

    if (error) return (
        <Typography style={{ color: '#f09595', textAlign: 'center', marginTop: '4rem', fontFamily: "'DM Sans', sans-serif" }}>
            {error}
        </Typography>
    )

    const getStatusStyle = (status) => {
        const s = status?.toLowerCase()
        if (s === 'levererad' || s === 'completed' || s === 'klar') {
            return { background: 'rgba(76, 175, 80, 0.1)', color: '#81c784', border: '1px solid rgba(76, 175, 80, 0.2)' }
        }
        if (s === 'behandlas' || s === 'pending' || s === 'mottagen') {
            return { background: 'rgba(201, 169, 110, 0.1)', color: '#c9a96e', border: '1px solid rgba(201, 169, 110, 0.2)' }
        }
        return { background: 'rgba(255,255,255,0.05)', color: '#aaa', border: '1px solid rgba(255,255,255,0.1)' }
    }

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
                Aktiva Beställningar (Admin)
            </h1>

            {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '5rem 1rem', color: 'rgba(245, 237, 216, 0.3)', fontSize: '14px' }}>
                    Inga lagda beställningar registrerade just nu.
                </div>
            ) : (
                <Grid container spacing={2}>
                    {orders.map((order) => (
                        <Grid item xs={12} key={order.id}>
                            <Box sx={{
                                background: '#1f160c',
                                border: '1px solid rgba(201, 169, 110, 0.1)',
                                borderRadius: '12px',
                                padding: '1.5rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                gap: '1.5rem',
                                transition: 'border-color 0.2s',
                                '&:hover': { borderColor: 'rgba(201, 169, 110, 0.25)' }
                            }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                                        <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#f5edd8', fontSize: '1.2rem', margin: '0 0 6px 0', fontWeight: 400 }}>
                                            {order.customerName}
                                        </h3>
                                        <span style={{ fontSize: '11px', color: 'rgba(201, 169, 110, 0.4)', fontWeight: 500 }}>
                                            #{order.id}
                                        </span>
                                    </div>
                                    <p style={{ color: 'rgba(245, 237, 216, 0.45)', fontSize: '13px', margin: 0, fontWeight: 300 }}>
                                        {order.customerEmail}
                                    </p>
                                </div>

                                <span style={{
                                    fontSize: '11px',
                                    fontWeight: 500,
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase',
                                    padding: '6px 16px',
                                    borderRadius: '30px',
                                    fontFamily: "'DM Sans', sans-serif",
                                    ...getStatusStyle(order.status)
                                }}>
                                    {order.status}
                                </span>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    )
}