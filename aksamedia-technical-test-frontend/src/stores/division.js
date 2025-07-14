import { defineStore } from 'pinia'
import divisionService from '@/services/division'

export const useDivisionStore = defineStore('division', {
  state: () => ({
    divisions: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchDivisions(params = {}) {
      this.loading = true
      try {
        const response = await divisionService.getDivisions(params)
        this.divisions = response.data.data.divisions
        return response.data
      } catch (error) {
        this.error = error
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})