import { useEffect, useState } from 'react'
import { getCategories } from '../api/categoryApi'

export function useCategories() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getCategories()
            .then((res) => setCategories(res.data))
            .catch(() => setError('Kunde inte hämta kategorier'))
            .finally(() => setLoading(false))
    }, [])

    return { categories, loading, error }
}