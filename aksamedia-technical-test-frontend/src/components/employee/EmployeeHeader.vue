<!-- EmployeeHeader.vue -->
<template>
  <div class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 py-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Employees</h1>
          <p class="text-gray-600">Manage your team members</p>
        </div>
        <button
          @click="$emit('add-employee')"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Employee
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['add-employee'])
</script>