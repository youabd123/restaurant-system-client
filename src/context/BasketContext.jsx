import { createContext, useContext, useMemo, useState } from 'react'

const BasketContext = createContext(null)

export function BasketProvider({ children }) {
    const [items, setItems] = useState([])

    const addItem = (menuItem, quantity = 1) => {
        if (!menuItem?.id) return
        const nextQuantity = Number(quantity)
        if (!Number.isFinite(nextQuantity) || nextQuantity <= 0) return

        setItems((prev) => {
            const existing = prev.find((item) => item.id === menuItem.id)
            if (existing) {
                return prev.map((item) =>
                    item.id === menuItem.id
                        ? { ...item, quantity: item.quantity + nextQuantity }
                        : item
                )
            }
            return [
                ...prev,
                {
                    id: menuItem.id,
                    name: menuItem.name,
                    price: Number(menuItem.price) || 0,
                    quantity: nextQuantity
                }
            ]
        })
    }

    const updateQuantity = (id, quantity) => {
        const nextQuantity = Number(quantity)
        if (!Number.isFinite(nextQuantity)) return

        setItems((prev) => {
            if (nextQuantity <= 0) return prev.filter((item) => item.id !== id)
            return prev.map((item) => (item.id === id ? { ...item, quantity: nextQuantity } : item))
        })
    }

    const removeItem = (id) => {
        setItems((prev) => prev.filter((item) => item.id !== id))
    }

    const clear = () => setItems([])

    const totalCount = useMemo(
        () => items.reduce((sum, item) => sum + item.quantity, 0),
        [items]
    )

    const totalPrice = useMemo(
        () => items.reduce((sum, item) => sum + item.quantity * item.price, 0),
        [items]
    )

    const value = useMemo(
        () => ({
            items,
            addItem,
            updateQuantity,
            removeItem,
            clear,
            totalCount,
            totalPrice
        }),
        [items, totalCount, totalPrice]
    )

    return <BasketContext.Provider value={value}>{children}</BasketContext.Provider>
}

export function useBasket() {
    return useContext(BasketContext)
}
