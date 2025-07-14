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
    <div v-if="loading" class="py-8">
      <LoadingSpinner />
    </div>
    <div v-else>
      <div v-if="employees.length === 0" class="text-center py-8">
        <p class="text-gray-500">No employees found.</p>
      </div>
      <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <EmployeeCard
          v-for="employee in employees"
          :key="employee.id"
          :employee="employee"
          @edit="$emit('edit', employee)"
          @delete="$emit('delete', employee)"
        />
      </div>
      <PaginationComponent
        v-if="employees.length > 0"
        :current-page="pagination.current_page"
        :last-page="pagination.last_page"
        :per-page="pagination.per_page"
        :total="pagination.total"
        :from="pagination.from"
        :to="pagination.to"
        @page-change="$emit('page-change', $event)"
        class="mt-6"
      />
    </div>
  </div>
</template>