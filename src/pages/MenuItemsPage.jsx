import { useEffect, useState } from 'react'
import { getMenuItems } from '../api/menuItemApi'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'

export default function MenuItemsPage() {
    const [menuItems, setMenuItems] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        getMenuItems()
            .then((res) => setMenuItems(res.data))
            .catch(() => setError('Kunde inte hämta menyartiklar'))
    }, [])

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
                                <Typography fontWeight={700}>{item.price} kr</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}