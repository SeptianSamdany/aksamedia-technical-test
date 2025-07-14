<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  filters: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['search'])

const searchTerm = ref(props.filters.name || '')
const divisionFilter = ref(props.filters.division_id || '')

watch(
  () => props.filters,
  (newVal) => {
    searchTerm.value = newVal.name || ''
    divisionFilter.value = newVal.division_id || ''
  }
)

const handleSearch = () => {
  emit('search', {
    name: searchTerm.value,
    division_id: divisionFilter.value
  })
}
</script>

<template>
  <form @submit.prevent="handleSearch" class="mb-6">
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="flex-1">
        <label for="search" class="sr-only">Search</label>
        <input
          type="text"
          id="search"
          v-model="searchTerm"
          placeholder="Search by name..."
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>
      <div class="flex-1">
        <label for="division" class="sr-only">Division</label>
        <select
          id="division"
          v-model="divisionFilter"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option value="">All Divisions</option>
          <option v-for="division in divisions" :key="division.id" :value="division.id">
            {{ division.name }}
          </option>
        </select>
      </div>
      <div>
        <button
          type="submit"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
    </div>
  </form>
</template>