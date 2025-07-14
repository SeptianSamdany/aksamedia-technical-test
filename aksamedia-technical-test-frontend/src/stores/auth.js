import { defineStore } from 'pinia'
import authService from '@/services/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('auth_token') || null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user
  },
  actions: {
    async login(credentials) {
      try {
        const response = await authService.login(credentials)
        this.token = response.data.data.token
        this.user = response.data.data.admin
        localStorage.setItem('auth_token', this.token)
        return response
      } catch (error) {
        throw error
      }
    },
    async logout() {
      try {
        await authService.logout()
        this.token = null
        this.user = null
        localStorage.removeItem('auth_token')
      } catch (error) {
        throw error
      }
    },
    setUser(user) {
      this.user = user
    }
  }
})