// composables/useAuth.js - Fixed Auth Composable
import { ref, computed } from 'vue'
import { apiClient } from './useApi'

const user = ref(null)
const token = ref(localStorage.getItem('auth_token') || null)
const loading = ref(false)
const error = ref(null)

export function useAuth() {
  const isAuthenticated = computed(() => !!token.value)
  const currentUser = computed(() => user.value)

  const login = async (credentials) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await apiClient.post('/login', credentials)
      
      if (response.data.status === 'success') {
        token.value = response.data.data.token
        user.value = response.data.data.admin
        localStorage.setItem('auth_token', token.value)
        return response.data
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Login failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    error.value = null
    
    try {
      await apiClient.post('/logout')
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      clearAuth()
      loading.value = false
    }
  }

  const clearAuth = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('auth_token')
  }

  const checkAuth = async () => {
    if (!token.value) {
      throw new Error('No token found')
    }
    // You can add API call here to verify token if needed
    return true
  }

  return {
    isAuthenticated,
    currentUser,
    loading,
    error,
    login,
    logout,
    checkAuth,
    clearAuth
  }
}