import { useEffect, useState } from 'react'
import { getOrders } from '../api/orderApi'

export function useOrders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getOrders()
            .then((res) => setOrders(res.data))
            .catch(() => setError('Kunde inte hämta ordrar'))
            .finally(() => setLoading(false))
    }, [])

    return { orders, loading, error }
}