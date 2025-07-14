<!-- components/employee/EmployeeCard.vue -->
<script setup>
defineProps({
  employee: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden group">
    <!-- Employee Info -->
    <div class="p-5">
      <div class="flex items-center space-x-4">
        <!-- Avatar -->
        <div class="flex-shrink-0">
          <div class="relative">
            <img
              v-if="employee.image"
              :src="employee.image"
              :alt="employee.name"
              class="h-12 w-12 rounded-full object-cover border-2 border-gray-100"
            />
            <div
              v-else
              class="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-100"
            >
              <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <!-- Online indicator (optional) -->
            <div class="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-400 border-2 border-white"></div>
          </div>
        </div>
        
        <!-- Employee Details -->
        <div class="min-w-0 flex-1">
          <h3 class="text-sm font-semibold text-gray-900 truncate">{{ employee.name }}</h3>
          <p class="text-sm text-gray-600 truncate">{{ employee.position }}</p>
          <div class="flex items-center mt-1">
            <div class="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
            <p class="text-xs text-gray-500 truncate">{{ employee.division.name }}</p>
          </div>
        </div>
      </div>
      
      <!-- Contact Info -->
      <div class="mt-4 pt-4 border-t border-gray-100">
        <div class="flex items-center text-xs text-gray-500">
          <svg class="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span class="truncate">{{ employee.phone || 'No phone' }}</span>
        </div>
      </div>
    </div>
    
    <!-- Actions -->
    <div class="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-end space-x-2">
      <button
        @click="emit('edit', employee)"
        class="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
      >
        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Edit
      </button>
      <button
        @click="emit('delete', employee)"
        class="inline-flex items-center px-3 py-1.5 text-xs font-medium text-white bg-red-600 border border-red-600 rounded-md hover:bg-red-700 hover:border-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
      >
        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Delete
      </button>
    </div>
  </div>
</template>