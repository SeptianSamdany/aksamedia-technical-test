// File: aksamedia-technical-test-frontend/src/components/common/ConfirmDialog.vue
<script setup>
defineProps({
  show: Boolean,
  title: String,
  message: String,
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
  type: {
    type: String,
    default: 'danger', // danger, warning, info, success
    validator: value => ['danger', 'warning', 'info', 'success'].includes(value)
  }
})

const emit = defineEmits(['confirm', 'cancel'])

const handleBackdropClick = (event) => {
  if (event.target === event.currentTarget) {
    emit('cancel')
  }
}

const getIconByType = (type) => {
  const icons = {
    danger: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />`,
    warning: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />`,
    info: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />`,
    success: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />`
  }
  return icons[type] || icons.danger
}

const getColorsByType = (type) => {
  const colors = {
    danger: {
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      confirmBg: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
      confirmText: 'text-white'
    },
    warning: {
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      confirmBg: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
      confirmText: 'text-white'
    },
    info: {
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      confirmBg: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
      confirmText: 'text-white'
    },
    success: {
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      confirmBg: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
      confirmText: 'text-white'
    }
  }
  return colors[type] || colors.danger
}
</script>

<template>
  <!-- Modal Backdrop with improved styling -->
  <div
    v-if="show"
    class="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity duration-300"
    @click="handleBackdropClick"
  >
    <!-- Modal Content with enhanced design -->
    <div class="bg-white rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
      <!-- Modal Header with Icon -->
      <div class="p-6 pb-4">
        <div class="flex items-start space-x-4">
          <!-- Icon -->
          <div :class="[
            'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
            getColorsByType(type).iconBg
          ]">
            <svg 
              class="w-6 h-6" 
              :class="getColorsByType(type).iconColor"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              v-html="getIconByType(type)"
            />
          </div>
          
          <!-- Content -->
          <div class="flex-1 min-w-0">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              {{ title }}
            </h3>
            <p class="text-sm text-gray-600 leading-relaxed">
              {{ message }}
            </p>
          </div>
        </div>
      </div>

      <!-- Modal Footer with improved button styling -->
      <div class="px-6 py-4 bg-gray-50 rounded-b-xl flex justify-end space-x-3">
        <button
          @click="emit('cancel')"
          type="button"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 shadow-sm"
        >
          {{ cancelText }}
        </button>
        <button
          @click="emit('confirm')"
          type="button"
          :class="[
            'inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 shadow-sm',
            getColorsByType(type).confirmBg,
            getColorsByType(type).confirmText
          ]"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>