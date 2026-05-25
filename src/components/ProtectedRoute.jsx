import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, requiredRole }) {
    const { user } = useAuth()

    // Om användaren inte är inloggad alls -> Skicka till login-sidan
    if (!user) {
        return <Navigate to="/login" replace />
    }

    // Om en specifik roll krävs (t.ex. Admin) och användaren saknar den -> Skicka till startsidan
    if (requiredRole && !user.roles?.includes(requiredRole)) {
        return <Navigate to="/" replace />
    }

    return children
}