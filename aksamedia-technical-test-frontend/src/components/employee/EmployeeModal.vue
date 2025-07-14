<!-- components/employee/EmployeeModal.vue -->
<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import { useDivisions } from '@/composables/useDivisions'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  employee: {
    type: Object,
    default: () => ({})
  },
  errors: {
    type: Object,
    default: () => ({})
  },
  isEdit: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'submit', 'confirm-delete'])

const { divisions, fetchDivisions } = useDivisions()

const form = reactive({
  name: '',
  phone: '',
  division: '',
  position: '',
  image: null
})

const imagePreview = ref(null)
const fileInput = ref(null)

onMounted(() => {
  fetchDivisions()
})

watch(() => props.employee, (newEmployee) => {
  if (newEmployee) {
    form.name = newEmployee.name || ''
    form.phone = newEmployee.phone || ''
    form.division = newEmployee.division || ''
    form.position = newEmployee.position || ''
    form.image = null
    imagePreview.value = newEmployee.image || null
  }
}, { immediate: true })

const handleImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    form.image = file
    
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const removeImage = () => {
  form.image = null
  imagePreview.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const handleSubmit = () => {
  emit('submit', { ...form })
}

const handleClose = () => {
  // Reset form
  Object.assign(form, {
    name: '',
    phone: '',
    division: '',
    position: '',
    image: null
  })
  imagePreview.value = null
  emit('close')
}

const handleDelete = () => {
  if (confirm('Are you sure you want to delete this employee?')) {
    emit('confirm-delete')
  }
}
</script>

<template>
  <!-- Modal Backdrop -->
  <div 
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    @click.self="handleClose"
  >
    <!-- Modal Content -->
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">
          {{ isEdit ? 'Edit Employee' : 'Add New Employee' }}
        </h3>
        <button
          @click="handleClose"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-6 space-y-6">
        <!-- Image Upload -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Profile Picture</label>
          <div class="flex items-center space-x-4">
            <!-- Image Preview -->
            <div class="flex-shrink-0">
              <div class="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                <img
                  v-if="imagePreview"
                  :src="imagePreview"
                  alt="Preview"
                  class="w-full h-full object-cover"
                />
                <svg
                  v-else
                  class="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            
            <!-- Upload Controls -->
            <div class="flex-1 space-y-2">
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                @change="handleImageChange"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
              />
              <button
                v-if="imagePreview"
                @click="removeImage"
                type="button"
                class="text-sm text-red-600 hover:text-red-800"
              >
                Remove image
              </button>
            </div>
          </div>
          <p v-if="errors.image" class="text-sm text-red-600">{{ errors.image[0] }}</p>
        </div>

        <!-- Name -->
        <div class="space-y-2">
          <label for="name" class="block text-sm font-medium text-gray-700">
            Full Name <span class="text-red-500">*</span>
          </label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            :class="{ 'border-red-500': errors.name }"
            placeholder="Enter employee name"
          />
          <p v-if="errors.name" class="text-sm text-red-600">{{ errors.name[0] }}</p>
        </div>

        <!-- Phone -->
        <div class="space-y-2">
          <label for="phone" class="block text-sm font-medium text-gray-700">
            Phone Number <span class="text-red-500">*</span>
          </label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            :class="{ 'border-red-500': errors.phone }"
            placeholder="Enter phone number"
          />
          <p v-if="errors.phone" class="text-sm text-red-600">{{ errors.phone[0] }}</p>
        </div>

        <!-- Division -->
        <div class="space-y-2">
          <label for="division" class="block text-sm font-medium text-gray-700">
            Division <span class="text-red-500">*</span>
          </label>
          <select
            id="division"
            v-model="form.division"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            :class="{ 'border-red-500': errors.division }"
          >
            <option value="">Select Division</option>
            <option 
              v-for="division in divisions" 
              :key="division.id" 
              :value="division.id"
            >
              {{ division.name }}
            </option>
          </select>
          <p v-if="errors.division" class="text-sm text-red-600">{{ errors.division[0] }}</p>
        </div>

        <!-- Position -->
        <div class="space-y-2">
          <label for="position" class="block text-sm font-medium text-gray-700">
            Position <span class="text-red-500">*</span>
          </label>
          <input
            id="position"
            v-model="form.position"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            :class="{ 'border-red-500': errors.position }"
            placeholder="Enter position"
          />
          <p v-if="errors.position" class="text-sm text-red-600">{{ errors.position[0] }}</p>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="flex justify-between items-center p-6 border-t border-gray-200 space-x-3">
        <div>
          <button
            v-if="isEdit"
            @click="handleDelete"
            type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
        
        <div class="flex space-x-3">
          <button
            @click="handleClose"
            type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            @click="handleSubmit"
            type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ isEdit ? 'Update' : 'Create' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>