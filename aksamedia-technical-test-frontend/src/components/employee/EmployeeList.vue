<!-- components/employee/EmployeeList.vue -->
<script setup>
import EmployeeCard from './EmployeeCard.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import PaginationComponent from '@/components/common/PaginationComponent.vue'

defineProps({
  employees: {
    type: Array,
    default: () => []
  },
  pagination: {
    type: Object,
    default: () => ({})
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['edit', 'delete', 'page-change'])
</script>

<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="py-12">
      <LoadingSpinner />
    </div>
    
    <!-- Main Content -->
    <div v-else>
      <!-- Empty State -->
      <div v-if="employees.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
        <p class="text-gray-500">Get started by adding your first employee.</p>
      </div>
      
      <!-- Employee Grid -->
      <div v-else>
        <div class="p-6">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <EmployeeCard
              v-for="employee in employees"
              :key="employee.id"
              :employee="employee"
              @edit="$emit('edit', employee)"
              @delete="$emit('delete', employee)"
            />
          </div>
        </div>
        
        <!-- Pagination -->
        <div v-if="employees.length > 0" class="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <PaginationComponent
            :current-page="pagination.current_page"
            :last-page="pagination.last_page"
            :per-page="pagination.per_page"
            :total="pagination.total"
            :from="pagination.from"
            :to="pagination.to"
            @page-change="$emit('page-change', $event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>