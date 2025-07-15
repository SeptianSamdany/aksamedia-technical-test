<!-- EmployeeModal.vue (Fixed) -->
<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg max-w-md w-full p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-medium">
          {{ isEdit ? 'Edit Employee' : 'Add Employee' }}
        </h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            v-model="form.phone"
            type="tel"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Division</label>
          <select
            v-model="form.division_id"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Division</option>
            <option v-for="division in divisions" :key="division.id" :value="division.id">
              {{ division.name }}
            </option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Position</label>
          <input
            v-model="form.position"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Photo</label>
          <input
            type="file"
            accept="image/*"
            @change="handleImageChange"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div class="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {{ isEdit ? 'Update' : 'Create' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useDivisions } from '@/composables/useDivisions'

const props = defineProps({
  employee: { type: Object, default: null },
  isEdit: { type: Boolean, default: false }
})

const emit = defineEmits(['close', 'save'])

const { divisions, fetchDivisions } = useDivisions()

const form = ref({
  name: '',
  phone: '',
  division_id: '',
  position: '',
  image: null
})

// Watch for employee changes and populate form
watch(() => props.employee, (newEmployee) => {
  if (newEmployee && props.isEdit) {
    form.value = {
      name: newEmployee.name || '',
      phone: newEmployee.phone || '',
      division_id: newEmployee.division?.id || '',
      position: newEmployee.position || '',
      image: null
    }
  } else if (!props.isEdit) {
    // Reset form for new employee
    form.value = {
      name: '',
      phone: '',
      division_id: '',
      position: '',
      image: null
    }
  }
}, { immediate: true })

const handleImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    form.value.image = file
  }
}

const handleSubmit = () => {
  // Send form data with proper field names
  const formData = {
    name: form.value.name,
    phone: form.value.phone,
    division: form.value.division_id, // Note: using 'division' as expected by API
    position: form.value.position,
    image: form.value.image
  }
  
  emit('save', formData)
}

onMounted(() => {
  fetchDivisions()
})
</script>