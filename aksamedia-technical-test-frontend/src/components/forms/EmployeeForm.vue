<script setup>
import { ref, watch } from 'vue'
import { useDivisions } from '@/composables/useDivisions'

const props = defineProps({
  employee: {
    type: Object,
    default: () => ({
      name: '',
      phone: '',
      division: '',
      position: '',
      image: null
    })
  },
  errors: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['submit', 'update:employee'])

const { divisions, fetchDivisions } = useDivisions()

const localEmployee = ref({ ...props.employee })
const imagePreview = ref(null)

watch(
  () => props.employee,
  (newVal) => {
    localEmployee.value = { ...newVal }
    if (newVal.image) {
      imagePreview.value = newVal.image
    }
  },
  { deep: true }
)

const handleImageChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    localEmployee.value.image = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

const removeImage = () => {
  localEmployee.value.image = null
  imagePreview.value = null
}

const handleSubmit = () => {
  emit('submit', localEmployee.value)
}

// Fetch divisions when component is mounted
fetchDivisions()
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
      <input
        type="text"
        id="name"
        v-model="localEmployee.name"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        :class="{ 'border-red-500': errors.name }"
      />
      <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name[0] }}</p>
    </div>

    <div>
      <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
      <input
        type="text"
        id="phone"
        v-model="localEmployee.phone"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        :class="{ 'border-red-500': errors.phone }"
      />
      <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone[0] }}</p>
    </div>

    <div>
      <label for="division" class="block text-sm font-medium text-gray-700">Division</label>
      <select
        id="division"
        v-model="localEmployee.division"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        :class="{ 'border-red-500': errors.division }"
      >
        <option value="">Select Division</option>
        <option v-for="division in divisions" :key="division.id" :value="division.id">
          {{ division.name }}
        </option>
      </select>
      <p v-if="errors.division" class="mt-1 text-sm text-red-600">{{ errors.division[0] }}</p>
    </div>

    <div>
      <label for="position" class="block text-sm font-medium text-gray-700">Position</label>
      <input
        type="text"
        id="position"
        v-model="localEmployee.position"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        :class="{ 'border-red-500': errors.position }"
      />
      <p v-if="errors.position" class="mt-1 text-sm text-red-600">{{ errors.position[0] }}</p>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Photo</label>
      <div class="mt-1 flex items-center">
        <div v-if="imagePreview" class="mr-4">
          <img :src="imagePreview" class="h-16 w-16 rounded-full object-cover" />
        </div>
        <div class="flex items-center">
          <label
            for="image"
            class="cursor-pointer rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span>{{ imagePreview ? 'Change' : 'Upload' }}</span>
            <input
              id="image"
              type="file"
              accept="image/*"
              class="sr-only"
              @change="handleImageChange"
            />
          </label>
          <button
            v-if="imagePreview"
            type="button"
            @click="removeImage"
            class="ml-2 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Remove
          </button>
        </div>
      </div>
      <p v-if="errors.image" class="mt-1 text-sm text-red-600">{{ errors.image[0] }}</p>
    </div>

    <div class="flex justify-end space-x-3 pt-4">
      <button
        type="button"
        @click="$emit('cancel')"
        class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Save
      </button>
    </div>
  </form>
</template>