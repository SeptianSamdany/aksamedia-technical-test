<!-- EmployeeView.vue - Updated with Notifications -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <EmployeeHeader @add-employee="openModal" />
    
    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 py-6">
      <!-- Search & Filter -->
      <EmployeeSearch 
        v-model="filters" 
        @search="handleSearch" 
        @clear="clearFilters" 
      />
      
      <!-- Employee List -->
      <EmployeeTable
        :employees="employees"
        :loading="loading"
        :pagination="pagination"
        @edit="openModal"
        @delete="confirmDelete"
        @page-change="handlePageChange"
      />
    </div>
    
    <!-- Modal -->
    <EmployeeModal
      v-if="showModal"
      :employee="selectedEmployee"
      :is-edit="isEdit"
      @close="closeModal"
      @save="handleSave"
    />
    
    <!-- Notification Container -->
    <NotificationContainer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useEmployees } from '@/composables/useEmployees'
import { useNotifications } from '@/composables/useNotifications'
import EmployeeHeader from '@/components/employee/EmployeeHeader.vue'
import EmployeeSearch from '@/components/employee/EmployeeSearch.vue'
import EmployeeTable from '@/components/employee/EmployeeTable.vue'
import EmployeeModal from '@/components/employee/EmployeeModal.vue'
import NotificationContainer from '@/components/icons/NotificationContainer.vue'

// Composables
const { employees, loading, pagination, fetchEmployees, createEmployee, updateEmployee, deleteEmployee } = useEmployees()
const { success, error } = useNotifications()

// Reactive state
const filters = ref({ name: '', division_id: '' })
const showModal = ref(false)
const selectedEmployee = ref(null)
const isEdit = ref(false)

// Initialize
onMounted(() => {
  fetchEmployees()
})

// Methods
const handleSearch = (newFilters) => {
  filters.value = { ...newFilters }
  fetchEmployees({ page: 1, ...filters.value })
}

const clearFilters = () => {
  filters.value = { name: '', division_id: '' }
  fetchEmployees({ page: 1 })
}

const handlePageChange = (page) => {
  fetchEmployees({ page, ...filters.value })
}

const openModal = (employee = null) => {
  selectedEmployee.value = employee
  isEdit.value = !!employee
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedEmployee.value = null
}

const handleSave = async (employeeData) => {
  try {
    if (isEdit.value) {
      await updateEmployee(selectedEmployee.value.id, employeeData)
      success(`Employee "${employeeData.name}" has been updated successfully!`)
    } else {
      await createEmployee(employeeData)
      success(`Employee "${employeeData.name}" has been created successfully!`)
    }
    closeModal()
    // Refresh current page after save
    fetchEmployees({ ...filters.value, page: pagination.current_page })
  } catch (err) {
    console.error('Error saving employee:', err)
    error(`Failed to ${isEdit.value ? 'update' : 'create'} employee. Please try again.`)
  }
}

const confirmDelete = async (employee) => {
  if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
    try {
      await deleteEmployee(employee.id)
      success(`Employee "${employee.name}" has been deleted successfully!`)
      fetchEmployees({ ...filters.value, page: pagination.current_page })
    } catch (err) {
      console.error('Error deleting employee:', err)
      error(`Failed to delete employee "${employee.name}". Please try again.`)
    }
  }
}
</script>