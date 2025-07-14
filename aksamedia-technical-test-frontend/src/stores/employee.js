import { defineStore } from 'pinia'
import employeeService from '@/services/employee'

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    employees: [],
    pagination: {
      current_page: 1,
      per_page: 10,
      total: 0,
      last_page: 1
    },
    loading: false,
    error: null
  }),
  actions: {
    async fetchEmployees(params = {}) {
      this.loading = true
      try {
        const response = await employeeService.getEmployees(params)
        this.employees = response.data.data.employees
        this.pagination = {
          current_page: response.data.pagination.current_page,
          per_page: response.data.pagination.per_page,
          total: response.data.pagination.total,
          last_page: response.data.pagination.last_page
        }
        return response.data
      } catch (error) {
        this.error = error
        throw error
      } finally {
        this.loading = false
      }
    },
    async createEmployee(employeeData) {
      try {
        const response = await employeeService.createEmployee(employeeData)
        await this.fetchEmployees()
        return response
      } catch (error) {
        throw error
      }
    },
    async updateEmployee(id, employeeData) {
      try {
        const response = await employeeService.updateEmployee(id, employeeData)
        await this.fetchEmployees()
        return response
      } catch (error) {
        throw error
      }
    },
    async deleteEmployee(id) {
      try {
        const response = await employeeService.deleteEmployee(id)
        await this.fetchEmployees()
        return response
      } catch (error) {
        throw error
      }
    }
  }
})