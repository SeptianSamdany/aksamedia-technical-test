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
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Employees</h1>
      <button
        @click="openAddModal"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Add Employee
      </button>
    </div>

    <SearchForm :filters="filters" @search="handleSearch" />

    <div v-if="error" class="rounded-md bg-red-50 p-4 mb-4">
      <div class="flex">
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Error loading employees</h3>
        </div>
      </div>
    </div>

    <EmployeeList
      :employees="employees"
      :pagination="pagination"
      :loading="loading"
      @edit="openEditModal"
      @delete="handleDelete"
      @page-change="handlePageChange"
    />

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