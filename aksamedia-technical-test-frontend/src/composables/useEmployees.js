// composables/useEmployees.js
import { ref, reactive } from 'vue'
import axios from 'axios'

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
      const response = await axios.get('/api/employees', {
        params: {
          page: params.page || 1,
          name: params.name || '',
          division_id: params.division_id || ''
        }
      })
      
      if (response.data.status === 'success') {
        employees.value = response.data.data.employees
        
        // Update pagination
        Object.assign(pagination, response.data.pagination)
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch employees'
      console.error('Error fetching employees:', err)
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
      
      if (employeeData.image) {
        formData.append('image', employeeData.image)
      }
      
      const response = await axios.post('/api/employees', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      if (response.data.status === 'success') {
        return response.data
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to create employee'
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
      formData.append('_method', 'PUT')
      
      if (employeeData.image && employeeData.image instanceof File) {
        formData.append('image', employeeData.image)
      }
      
      const response = await axios.post(`/api/employees/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      if (response.data.status === 'success') {
        return response.data
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to update employee'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteEmployee = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.delete(`/api/employees/${id}`)
      
      if (response.data.status === 'success') {
        return response.data
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to delete employee'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    employees,
    pagination,
    loading,
    error,
    fetchEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
  }
}