// composables/useDivisions.js - Fixed Divisions Composable
import { ref } from 'vue'
import { apiClient } from './useApi'

export function useDivisions() {
  const divisions = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchDivisions = async (params = {}) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await apiClient.get('/divisions', {
        params: {
          name: params.name || '',
          per_page: params.per_page || 100 // For dropdown usage
        }
      })
      
      if (response.data.status === 'success') {
        divisions.value = response.data.data.divisions
        return response.data
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch divisions'
      console.error('Error fetching divisions:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  const resetState = () => {
    divisions.value = []
    loading.value = false
    error.value = null
  }

  return {
    divisions,
    loading,
    error,
    fetchDivisions,
    clearError,
    resetState
  }
}
