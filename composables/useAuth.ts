import { ref, computed } from 'vue'
import { api } from '../utils/api'

export interface User {
  uuid: string
  name: string
  email: string
  phone_number: string
  store_name: string
  category_store: string
  address: string
  latitude: number | null
  longitude: number | null
  description: string | null
  photo_profile: string | null
  role: 'admin' | 'penjual'
  is_active: boolean
  is_verified: boolean
  created_at: string
  updated_at: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  phone_number: string
  store_name: string
  category_store?: string
  address: string
  role: 'admin' | 'penjual'
  description?: string
  latitude?: number
  longitude?: number
}

export interface LoginResponse {
  access_token: string
  refresh_token: string
  user: User
}

const user = ref<User | null>(null)
const token = ref<string | null>(null)
const initialized = ref(false)

export const useAuth = () => {
  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isPenjual = computed(() => user.value?.role === 'penjual')

  const checkAuth = async () => {
    if (!process.client) return

    const storedToken = localStorage.getItem('access_token')
    if (!storedToken) {
      token.value = null
      user.value = null
      initialized.value = true
      return
    }

    token.value = storedToken

    // Try to restore user from localStorage first
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser)
      } catch {
        user.value = null
      }
    }

    // Always re-validate with backend to ensure token is still valid
    try {
      const freshUser = await fetchMe()
      user.value = freshUser
      localStorage.setItem('user', JSON.stringify(freshUser))
    } catch {
      // Token invalid — clear session
      token.value = null
      user.value = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user')
    }

    initialized.value = true
  }

  const login = async (email: string, password: string): Promise<LoginResponse> => {
    const data: LoginResponse = await api.post('/auth/login', { email, password })
    if (data.access_token) {
      token.value = data.access_token
      if (process.client) {
        localStorage.setItem('access_token', data.access_token)
        if (data.refresh_token) localStorage.setItem('refresh_token', data.refresh_token)
        if (data.user) localStorage.setItem('user', JSON.stringify(data.user))
      }
      user.value = data.user || null
    }
    return data
  }

  const fetchMe = async (): Promise<User> => {
    const me: User = await api.get('/auth/me')
    return me
  }

  const register = async (payload: RegisterPayload) => {
    const data = await api.post('/auth/register', payload)
    return data // returns { verification_token, ... }
  }

  const verifyEmail = async (tokenStr: string) => {
    return api.post('/auth/verify', { token: tokenStr })
  }

  const logout = async () => {
    try {
      if (token.value) await api.post('/auth/logout')
    } catch {
      // silent — token may already be revoked
    } finally {
      if (process.client) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user')
      }
      token.value = null
      user.value = null
      navigateTo('/login')
    }
  }

  const updateProfile = async (payload: Partial<User>) => {
    const updated = await api.post('/auth/update-profile', payload)
    user.value = updated
    if (process.client) localStorage.setItem('user', JSON.stringify(updated))
    return updated
  }

  return {
    user,
    token,
    initialized,
    isAuthenticated,
    isAdmin,
    isPenjual,
    checkAuth,
    fetchMe,
    login,
    register,
    verifyEmail,
    logout,
    updateProfile,
  }
}
