import { useEffect, useState } from 'react'
import { getMenuItems } from '../api/menuItemApi'

export function useMenuItems() {
    const [menuItems, setMenuItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getMenuItems()
            .then((res) => setMenuItems(res.data))
            .catch(() => setError('Kunde inte hämta menyartiklar'))
            .finally(() => setLoading(false))
    }, [])

    return { menuItems, loading, error }
}