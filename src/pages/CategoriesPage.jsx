import { useCategories } from '../Hooks/useCategories'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'

export default function CategoriesPage() {
    const { categories, loading, error } = useCategories()

    if (loading) return <Box display="flex" justifyContent="center" mt={8}><CircularProgress /></Box>
    if (error) return <Typography color="error" textAlign="center" mt={4}>{error}</Typography>

    return (
        <Box>
            <Box mb={4}>
                <Typography variant="h3" fontWeight={800}>Kategorier</Typography>
                <Typography color="text.secondary" mt={1}>{categories.length} kategorier</Typography>
            </Box>
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