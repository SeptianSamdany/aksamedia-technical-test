// composables/useDivisions.js
import { ref } from 'vue'
import axios from 'axios'

export function useDivisions() {
  const divisions = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchDivisions = async (params = {}) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.get('/api/divisions', {
        params: {
          name: params.name || '',
          // Remove pagination for simple dropdown usage
          per_page: 100
        }
      })
      
      if (response.data.status === 'success') {
        divisions.value = response.data.data.divisions
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch divisions'
      console.error('Error fetching divisions:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    divisions,
    loading,
    error,
    fetchDivisions
  }
}