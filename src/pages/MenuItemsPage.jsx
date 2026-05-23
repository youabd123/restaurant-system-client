import { useMenuItems } from '../hooks/useMenuItems'
import { formatPrice } from '../helpers/formatPrice'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'

export default function MenuItemsPage() {
    const { menuItems, loading, error } = useMenuItems()

    if (loading) return <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>
    if (error) return <Typography color="error">{error}</Typography>

    return (
        <Box>
            <Typography variant="h4" mb={3}>Menyartiklar</Typography>
            <Grid container spacing={2}>
                {menuItems.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{item.name}</Typography>
                                <Typography color="text.secondary">{item.description}</Typography>
                                <Typography fontWeight={700}>{formatPrice(item.price)}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}