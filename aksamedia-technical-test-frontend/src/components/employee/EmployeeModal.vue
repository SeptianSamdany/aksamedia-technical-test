<script setup>
import { ref, watch } from 'vue'
import EmployeeForm from '@/components/forms/EmployeeForm.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'

const props = defineProps({
  show: Boolean,
  employee: {
    type: Object,
    default: () => ({})
  },
  errors: {
    type: Object,
    default: () => ({})
  },
  isEdit: Boolean
})

const emit = defineEmits(['close', 'submit', 'confirm-delete'])

const showConfirmDialog = ref(false)

const handleSubmit = (employeeData) => {
  emit('submit', employeeData)
}

const handleDelete = () => {
  showConfirmDialog.value = true
}

const confirmDelete = () => {
  emit('confirm-delete')
  showConfirmDialog.value = false
}
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 overflow-y-auto z-50"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
        @click="emit('close')"
      ></div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
            {{ isEdit ? 'Edit Employee' : 'Add New Employee' }}
          </h3>
          <EmployeeForm
            :employee="employee"
            :errors="errors"
            @submit="handleSubmit"
            @cancel="emit('close')"
          />
        </div>
        <div
          v-if="isEdit"
          class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
        >
          <button
            type="button"
            @click="handleDelete"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>

  <ConfirmDialog
    v-if="showConfirmDialog"
    title="Delete Employee"
    message="Are you sure you want to delete this employee?"
    confirm-text="Delete"
    @confirm="confirmDelete"
    @cancel="showConfirmDialog = false"
  />
</template>