import { useCategories } from '../hooks/useCategories'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import Chip from '@mui/material/Chip'

export default function CategoriesPage() {
    const { categories, loading, error } = useCategories()

    if (loading) return <Box display="flex" justifyContent="center" mt={8}><CircularProgress /></Box>
    if (error) return <Typography color="error" textAlign="center" mt={4}>{error}</Typography>

    return (
        <Box>
            <Box mb={4}>
                <Typography variant="h3" fontWeight={800}>Kategorier</Typography>
                <Typography color="text.secondary" mt={1}>
                    {categories.length} kategorier tillgängliga
                </Typography>
            </Box>
            <Grid container spacing={3}>
                {categories.map((cat) => (
                    <Grid item xs={12} sm={6} md={4} key={cat.id}>
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
                                    <Typography variant="h6" fontWeight={700}>{cat.name}</Typography>
                                    <Chip label="Kategori" size="small" color="primary" />
                                </Box>
                                <Typography color="text.secondary">{cat.description}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}