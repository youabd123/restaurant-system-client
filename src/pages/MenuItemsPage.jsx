import { useMenuItems } from '../hooks/useMenuItems'
import { formatPrice } from '../helpers/formatPrice'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'

export default function MenuItemsPage() {
    const { menuItems, loading, error } = useMenuItems()

    if (loading) return <Box display="flex" justifyContent="center" mt={8}><CircularProgress /></Box>
    if (error) return <Typography color="error" textAlign="center" mt={4}>{error}</Typography>

    return (
        <Box>
            <Box mb={4}>
                <Typography variant="h3" fontWeight={800}>Menyartiklar</Typography>
                <Typography color="text.secondary" mt={1}>
                    {menuItems.length} rätter på menyn
                </Typography>
            </Box>
            <Grid container spacing={3}>
                {menuItems.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Card
                            sx={{
                                height: '100%',
                                borderRadius: 3,
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 6,
                                },
                            }}
                        >
                            <CardContent sx={{ p: 3 }}>
                                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                                    <Typography variant="h6" fontWeight={700}>{item.name}</Typography>
                                    {item.isAvailable ? (
                                        <Chip label="Tillgänglig" size="small" color="success" />
                                    ) : (
                                        <Chip label="Slut" size="small" color="error" />
                                    )}
                                </Box>
                                <Typography color="text.secondary" mb={2}>{item.description}</Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Typography variant="h6" fontWeight={800} color="primary">
                                    {formatPrice(item.price)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}