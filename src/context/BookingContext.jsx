import { createContext, useContext, useState } from 'react'

const BookingContext = createContext()

export function BookingProvider({ children }) {
    const [open, setOpen] = useState(false)
    return (
        <BookingContext.Provider value={{ open, openModal: () => setOpen(true), closeModal: () => setOpen(false) }}>
            {children}
        </BookingContext.Provider>
    )
}

export const useBooking = () => useContext(BookingContext)
