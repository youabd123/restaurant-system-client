import { useCategories } from '../hooks/useCategories'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'

export default function CategoriesPage() {
    const { categories, loading, error } = useCategories()

    if (loading) return <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>
    if (error) return <Typography color="error">{error}</Typography>

    return (
        <Box>
            <Typography variant="h4" mb={3}>Kategorier</Typography>
            <Grid container spacing={2}>
                {categories.map((cat) => (
                    <Grid item xs={12} sm={6} md={4} key={cat.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{cat.name}</Typography>
                                <Typography color="text.secondary">{cat.description}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}