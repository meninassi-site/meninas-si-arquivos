import { createContext, useContext, useEffect, useState } from 'react'
import { api, getStoredToken, setStoredToken } from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getStoredToken()
    if (!token) {
      setLoading(false)
      return
    }

    api
      .get('/auth/me')
      .then((response) => setAdmin(response.data))
      .catch(() => setStoredToken(null))
      .finally(() => setLoading(false))
  }, [])

  async function login(email, password) {
    const response = await api.post('/auth/login', { email, password })
    setStoredToken(response.data.token)
    setAdmin(response.data.admin)
    return response.data.admin
  }

  function logout() {
    setStoredToken(null)
    setAdmin(null)
  }

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, isAuthenticated: Boolean(admin) }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
