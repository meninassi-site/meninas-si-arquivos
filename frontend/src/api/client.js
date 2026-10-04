import axios from 'axios'

// Falls back to the Vite dev proxy ('/api' -> http://localhost:3333) so
// nothing needs configuring locally; set VITE_API_URL at build time if the
// frontend is deployed on a different origin than the API.
const baseURL = import.meta.env.VITE_API_URL || '/api'

export const api = axios.create({ baseURL })

const TOKEN_KEY = 'meninas-si.token'

export function getStoredToken() {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function setStoredToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  } catch {
    // localStorage unavailable (private mode, etc.) — session simply won't persist a reload.
  }
}

api.interceptors.request.use((config) => {
  const token = getStoredToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/** Pulls the backend's `{ error, details }` body into a readable message. */
export function getApiErrorMessage(error, fallback = 'Ocorreu um erro inesperado.') {
  const data = error?.response?.data
  if (!data) return fallback
  if (Array.isArray(data.details) && data.details.length > 0) {
    return data.details.map((item) => item.message).join(' ')
  }
  return data.error || fallback
}
