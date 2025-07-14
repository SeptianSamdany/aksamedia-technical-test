import apiClient from './api'

export default {
  getEmployees(params = {}) {
    return apiClient.get('/employees', { params })
  },
  createEmployee(employeeData) {
    const formData = new FormData()
    for (const key in employeeData) {
      if (employeeData[key] !== null && employeeData[key] !== undefined) {
        formData.append(key, employeeData[key])
      }
    }
    return apiClient.post('/employees', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  updateEmployee(id, employeeData) {
    const formData = new FormData()
    for (const key in employeeData) {
      if (employeeData[key] !== null && employeeData[key] !== undefined) {
        formData.append(key, employeeData[key])
      }
    }
    return apiClient.post(`/employees/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  deleteEmployee(id) {
    return apiClient.delete(`/employees/${id}`)
  }
}