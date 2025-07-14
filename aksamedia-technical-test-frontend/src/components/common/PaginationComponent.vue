<!-- components/common/PaginationComponent.vue -->
<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1
  },
  lastPage: {
    type: Number,
    default: 1
  },
  total: {
    type: Number,
    default: 0
  },
  perPage: {
    type: Number,
    default: 10
  },
  from: {
    type: Number,
    default: 0
  },
  to: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['page-change'])

const pages = computed(() => {
  const pageNumbers = []
  const start = Math.max(1, props.currentPage - 2)
  const end = Math.min(props.lastPage, props.currentPage + 2)
  
  for (let i = start; i <= end; i++) {
    pageNumbers.push(i)
  }
  
  return pageNumbers
})

const showPrevious = computed(() => props.currentPage > 1)
const showNext = computed(() => props.currentPage < props.lastPage)

const changePage = (page) => {
  if (page >= 1 && page <= props.lastPage && page !== props.currentPage) {
    emit('page-change', page)
  }
}
</script>

<template>
  <div class="flex items-center justify-between">
    <!-- Results Info -->
    <div class="text-sm text-gray-700">
      Showing {{ from }} to {{ to }} of {{ total }} results
    </div>
    
    <!-- Pagination Controls -->
    <div class="flex items-center space-x-1">
      <!-- Previous Button -->
      <button
        @click="changePage(currentPage - 1)"
        :disabled="!showPrevious"
        class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <!-- Page Numbers -->
      <template v-for="page in pages" :key="page">
        <button
          @click="changePage(page)"
          class="px-3 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
          :class="{
            'bg-gray-900 text-white': page === currentPage,
            'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50': page !== currentPage
          }"
        >
          {{ page }}
        </button>
      </template>
      
      <!-- Next Button -->
      <button
        @click="changePage(currentPage + 1)"
        :disabled="!showNext"
        class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>