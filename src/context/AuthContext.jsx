import { createContext, useState, useContext } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const fullName = localStorage.getItem('fullName')
    const roles = JSON.parse(localStorage.getItem('roles') || '[]')
    return token ? { token, email, fullName, roles } : null
  })

  const login = (data) => {
    localStorage.setItem('token', data.token)
    localStorage.setItem('email', data.email)
    localStorage.setItem('fullName', data.fullName ?? '')
    localStorage.setItem('roles', JSON.stringify(data.roles))
    setUser(data)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('fullName')
    localStorage.removeItem('roles')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}