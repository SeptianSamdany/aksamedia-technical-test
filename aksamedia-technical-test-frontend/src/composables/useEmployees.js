// composables/useEmployees.js - Fixed Employees Composable
import { ref, reactive } from 'vue'
import { apiClient } from './useApi'

export function useEmployees() {
  const employees = ref([])
  const loading = ref(false)
  const error = ref(null)
  
  const pagination = reactive({
    current_page: 1,
    per_page: 10,
    total: 0,
    last_page: 1,
    from: 0,
    to: 0
  })

  const fetchEmployees = async (params = {}) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await apiClient.get('/employees', {
        params: {
          page: params.page || 1,
          name: params.name || '',
          division_id: params.division_id || '',
          per_page: params.per_page || 10
        }
      })
      
      if (response.data.status === 'success') {
        employees.value = response.data.data.employees
        
        // Update pagination
        Object.assign(pagination, {
          current_page: response.data.pagination.current_page,
          per_page: response.data.pagination.per_page,
          total: response.data.pagination.total,
          last_page: response.data.pagination.last_page,
          from: response.data.pagination.from,
          to: response.data.pagination.to
        })
        
        return response.data
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch employees'
      console.error('Error fetching employees:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createEmployee = async (employeeData) => {
    loading.value = true
    error.value = null
    
    try {
      const formData = new FormData()
      formData.append('name', employeeData.name)
      formData.append('phone', employeeData.phone)
      formData.append('division', employeeData.division)
      formData.append('position', employeeData.position)
      
      if (employeeData.image && employeeData.image instanceof File) {
        formData.append('image', employeeData.image)
      }
      
      const response = await apiClient.post('/employees', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      if (response.data.status === 'success') {
        return response.data
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to create employee'
      console.error('Error creating employee:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateEmployee = async (id, employeeData) => {
    loading.value = true
    error.value = null
    
    try {
      const formData = new FormData()
      formData.append('name', employeeData.name)
      formData.append('phone', employeeData.phone)
      formData.append('division', employeeData.division)
      formData.append('position', employeeData.position)
      formData.append('_method', 'PUT') // Laravel method spoofing
      
      if (employeeData.image && employeeData.image instanceof File) {
        formData.append('image', employeeData.image)
      }
      
      const response = await apiClient.post(`/employees/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      if (response.data.status === 'success') {
        return response.data
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to update employee'
      console.error('Error updating employee:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteEmployee = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await apiClient.delete(`/employees/${id}`)
      
      if (response.data.status === 'success') {
        return response.data
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to delete employee'
      console.error('Error deleting employee:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  const resetState = () => {
    employees.value = []
    Object.assign(pagination, {
      current_page: 1,
      per_page: 10,
      total: 0,
      last_page: 1,
      from: 0,
      to: 0
    })
    loading.value = false
    error.value = null
  }

  return {
    employees,
    pagination,
    loading,
    error,
    fetchEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    clearError,
    resetState
  }
}