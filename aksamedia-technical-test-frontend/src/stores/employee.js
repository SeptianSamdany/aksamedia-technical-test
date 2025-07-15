import { defineStore } from 'pinia'
import { useEmployees } from '@/composables/useEmployees'

export const useEmployeeStore = defineStore('employee', () => {
  const employees = useEmployees()
  
  return {
    ...employees
  }
})