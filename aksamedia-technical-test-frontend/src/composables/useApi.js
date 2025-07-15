// composables/useApi.js - Enhanced API Composable
import { ref } from 'vue'
import axios from 'axios'

// Create a shared axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export function useApi(fn) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const execute = async (...args) => {
    loading.value = true
    error.value = null
    
    try {
      const result = await fn(...args)
      data.value = result
      return result
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'An error occurred'
      throw err
    } finally {
      loading.value = false
    }
  }

  const reset = () => {
    data.value = null
    error.value = null
    loading.value = false
  }

  return {
    data,
    error,
    loading,
    execute,
    reset
  }
}

// Export the shared axios instance
export { apiClient }