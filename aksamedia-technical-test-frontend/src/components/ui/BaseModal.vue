<template>
  <teleport to="body">
    <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-screen items-center justify-center p-4">
        <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="close"></div>
        
        <div class="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
          <div class="px-6 py-4">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium text-gray-900">
                {{ title }}
              </h3>
              <button @click="close" class="text-gray-400 hover:text-gray-600">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div class="px-6 py-4">
            <slot></slot>
          </div>
          
          <div class="px-6 py-4 bg-gray-50 flex justify-end space-x-2">
            <BaseButton variant="outline" @click="close">
              {{ cancelText }}
            </BaseButton>
            <BaseButton 
              :variant="confirmVariant" 
              :loading="loading"
              @click="$emit('confirm')"
            >
              {{ confirmText }}
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import BaseButton from './BaseButton.vue'

export default {
  name: 'BaseModal',
  components: {
    BaseButton
  },
  emits: ['close', 'confirm'],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    confirmText: {
      type: String,
      default: 'Confirm'
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    },
    confirmVariant: {
      type: String,
      default: 'primary'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>