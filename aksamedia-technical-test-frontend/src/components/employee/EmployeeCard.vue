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
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="p-4">
      <div class="flex items-center">
        <div class="flex-shrink-0 h-16 w-16">
          <img
            v-if="employee.image"
            :src="employee.image"
            class="h-16 w-16 rounded-full object-cover"
          />
          <div
            v-else
            class="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>
        <div class="ml-4">
          <h3 class="text-lg font-medium text-gray-900">{{ employee.name }}</h3>
          <p class="text-sm text-gray-500">{{ employee.position }}</p>
          <p class="text-sm text-gray-500">{{ employee.division.name }}</p>
        </div>
      </div>
      <div class="mt-4 flex justify-end space-x-2">
        <button
          @click="emit('edit', employee)"
          class="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Edit
        </button>
        <button
          @click="emit('delete', employee)"
          class="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>