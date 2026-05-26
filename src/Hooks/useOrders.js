import { useEffect, useState } from 'react'
import { getOrders, getMyOrders } from '../api/orderApi'
import { useAuth } from '../context/AuthContext'

export function useOrders() {
    const { user } = useAuth()
    const isAdmin = user?.roles?.includes('Admin')

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetch = isAdmin ? getOrders : getMyOrders
        fetch()
            .then((res) => setOrders(res.data))
            .catch(() => setError('Kunde inte hämta ordrar'))
            .finally(() => setLoading(false))
    }, [isAdmin])

    return { orders, setOrders, loading, error }
}
