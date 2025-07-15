<!-- EmployeeSearch.vue (Fixed) -->
<template>
  <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
        <input
          v-model="localFilters.name"
          type="text"
          placeholder="Search by name..."
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          @keyup.enter="handleSearch"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Division</label>
        <select
          v-model="localFilters.division_id"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Divisions</option>
          <option v-for="division in divisions" :key="division.id" :value="division.id">
            {{ division.name }}
          </option>
        </select>
      </div>
      
      <div class="flex items-end gap-2">
        <button
          @click="handleSearch"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Search
        </button>
        <button
          @click="handleClear"
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          Clear
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useDivisions } from '@/composables/useDivisions'

const props = defineProps({
  modelValue: { type: Object, default: () => ({ name: '', division_id: '' }) }
})

const emit = defineEmits(['update:modelValue', 'search', 'clear'])

const { divisions, fetchDivisions } = useDivisions()
const localFilters = ref({ ...props.modelValue })

// Watch for prop changes
watch(() => props.modelValue, (newVal) => {
  localFilters.value = { ...newVal }
}, { deep: true })

// Watch for local changes and emit
watch(localFilters, (newVal) => {
  emit('update:modelValue', newVal)
}, { deep: true })

const handleSearch = () => {
  emit('search', { ...localFilters.value })
}

const handleClear = () => {
  localFilters.value = { name: '', division_id: '' }
  emit('clear')
}

onMounted(() => {
  fetchDivisions()
})
</script>