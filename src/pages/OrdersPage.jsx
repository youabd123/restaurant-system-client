import { useOrders } from '../Hooks/useOrders'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import Chip from '@mui/material/Chip'

export default function OrdersPage() {
    const { orders, loading, error } = useOrders()

    if (loading) return <Box display="flex" justifyContent="center" mt={8}><CircularProgress /></Box>
    if (error) return <Typography color="error" textAlign="center" mt={4}>{error}</Typography>

    return (
        <Box>
            <Box mb={4}>
                <Typography variant="h3" fontWeight={800}>Ordrar</Typography>
                <Typography color="text.secondary" mt={1}>{orders.length} ordrar totalt</Typography>
            </Box>
            <Grid container spacing={2}>
                {orders.map((order) => (
                    <Grid item xs={12} sm={6} md={4} key={order.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{order.customerName}</Typography>
                                <Typography color="text.secondary">{order.customerEmail}</Typography>
                                <Box mt={1}>
                                    <Chip label={order.status} size="small" color="primary" />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}