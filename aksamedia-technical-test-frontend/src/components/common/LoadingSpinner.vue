<!-- components/common/LoadingSpinner.vue -->
<script setup>
defineProps({
  size: {
    type: String,
    default: 'medium' // small, medium, large
  },
  message: {
    type: String,
    default: 'Loading...'
  }
})

const sizeClasses = {
  small: 'w-4 h-4',
  medium: 'w-8 h-8',
  large: 'w-12 h-12'
}
</script>

<template>
  <div class="flex flex-col items-center justify-center space-y-4">
    <!-- Spinner -->
    <div class="relative">
      <div 
        class="animate-spin rounded-full border-4 border-gray-200 border-t-gray-900"
        :class="sizeClasses[size]"
      ></div>
    </div>
    
    <!-- Loading Message -->
    <p class="text-sm text-gray-600 font-medium">{{ message }}</p>
  </div>
</template>