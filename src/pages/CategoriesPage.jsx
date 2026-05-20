import { useEffect, useState } from 'react'
import { getCategories } from '../api/categoryApi'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'

export default function CategoriesPage() {
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        getCategories()
            .then((res) => setCategories(res.data))
            .catch(() => setError('Kunde inte hämta kategorier'))
    }, [])

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