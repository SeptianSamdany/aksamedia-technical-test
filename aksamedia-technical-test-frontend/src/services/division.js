import apiClient from './api'

export default {
  getDivisions(params = {}) {
    return apiClient.get('/divisions', { params })
  }
}