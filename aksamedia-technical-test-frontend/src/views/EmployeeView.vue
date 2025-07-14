<!-- EmployeeView.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useEmployees } from '@/composables/useEmployees'
import { useDivisions } from '@/composables/useDivisions'
import EmployeeList from '@/components/employee/EmployeeList.vue'
import EmployeeModal from '@/components/employee/EmployeeModal.vue'
import SearchForm from '@/components/forms/SearchForm.vue'

const {
  employees,
  pagination,
  loading,
  error,
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = useEmployees()

const { divisions, fetchDivisions } = useDivisions()

const filters = ref({
  name: '',
  division_id: ''
})

const showModal = ref(false)
const currentEmployee = ref(null)
const isEdit = ref(false)
const formErrors = ref({})

onMounted(() => {
  fetchEmployees()
  fetchDivisions()
})

const handleSearch = (newFilters) => {
  filters.value = { ...newFilters }
  fetchEmployees({ page: 1, ...filters.value })
}

const handlePageChange = (page) => {
  fetchEmployees({ page, ...filters.value })
}

const openAddModal = () => {
  currentEmployee.value = {
    name: '',
    phone: '',
    division: '',
    position: '',
    image: null
  }
  isEdit.value = false
  formErrors.value = {}
  showModal.value = true
}

const openEditModal = (employee) => {
  currentEmployee.value = {
    ...employee,
    division: employee.division.id
  }
  isEdit.value = true
  formErrors.value = {}
  showModal.value = true
}

const handleSubmit = async (employeeData) => {
  formErrors.value = {}
  try {
    if (isEdit.value) {
      await updateEmployee(currentEmployee.value.id, employeeData)
    } else {
      await createEmployee(employeeData)
    }
    showModal.value = false
    fetchEmployees({ ...filters.value, page: pagination.value.current_page })
  } catch (err) {
    if (err.response && err.response.data.errors) {
      formErrors.value = err.response.data.errors
    }
  }
}

const handleDelete = async (employee) => {
  if (confirm('Are you sure you want to delete this employee?')) {
    await deleteEmployee(employee.id)
    fetchEmployees({ ...filters.value, page: pagination.value.current_page })
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section -->
    <div class="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Employees</h1>
              <p class="text-sm text-gray-500">Manage your team members</p>
            </div>
          </div>
          <button
            @click="openAddModal"
            class="inline-flex items-center px-4 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-200 shadow-sm"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Employee
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Search Section -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <SearchForm :filters="filters" @search="handleSearch" />
      </div>

      <!-- Error Message -->
      <div v-if="error" class="rounded-lg bg-red-50 border border-red-200 p-4 mb-6">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-sm font-medium text-red-800">Error loading employees</h3>
        </div>
      </div>

      <!-- Employee List -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <EmployeeList
          :employees="employees"
          :pagination="pagination"
          :loading="loading"
          @edit="openEditModal"
          @delete="handleDelete"
          @page-change="handlePageChange"
        />
      </div>
    </div>

    <!-- Modal -->
    <EmployeeModal
      v-if="showModal"
      :show="showModal"
      :employee="currentEmployee"
      :errors="formErrors"
      :is-edit="isEdit"
      @close="showModal = false"
      @submit="handleSubmit"
      @confirm-delete="handleDelete(currentEmployee)"
    />
  </div>
</template>