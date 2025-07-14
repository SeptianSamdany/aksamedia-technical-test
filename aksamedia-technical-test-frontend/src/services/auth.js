import apiClient from './api'

export default {
  login(credentials) {
    // Ensure this is POST and credentials are sent as JSON
    return apiClient.post('/login', credentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },
  logout() {
    return apiClient.post('/logout')
  }
}