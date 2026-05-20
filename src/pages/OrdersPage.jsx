import { useEffect, useState } from 'react'
import { getOrders } from '../api/orderApi'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'

export default function OrdersPage() {
    const [orders, setOrders] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        getOrders()
            .then((res) => setOrders(res.data))
            .catch(() => setError('Kunde inte hämta ordrar'))
    }, [])

    if (error) return <Typography color="error">{error}</Typography>

    return (
        <Box>
            <Typography variant="h4" mb={3}>Ordrar</Typography>
            <Grid container spacing={2}>
                {orders.map((order) => (
                    <Grid item xs={12} sm={6} md={4} key={order.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{order.customerName}</Typography>
                                <Typography color="text.secondary">{order.customerEmail}</Typography>
                                <Typography>Status: {order.status}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}