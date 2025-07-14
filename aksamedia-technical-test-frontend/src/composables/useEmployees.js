import { computed } from 'vue'
import { useEmployeeStore } from '@/stores/employee'

export function useEmployees() {
  const employeeStore = useEmployeeStore()

  const employees = computed(() => employeeStore.employees)
  const pagination = computed(() => employeeStore.pagination)
  const loading = computed(() => employeeStore.loading)
  const error = computed(() => employeeStore.error)

  const fetchEmployees = async (params) => {
    return await employeeStore.fetchEmployees(params)
  }

  const createEmployee = async (employeeData) => {
    return await employeeStore.createEmployee(employeeData)
  }

  const updateEmployee = async (id, employeeData) => {
    return await employeeStore.updateEmployee(id, employeeData)
  }

  const deleteEmployee = async (id) => {
    return await employeeStore.deleteEmployee(id)
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