import { computed } from 'vue'
import { useDivisionStore } from '@/stores/division'

export function useDivisions() {
  const divisionStore = useDivisionStore()

  const divisions = computed(() => divisionStore.divisions)
  const loading = computed(() => divisionStore.loading)
  const error = computed(() => divisionStore.error)

  const fetchDivisions = async (params) => {
    return await divisionStore.fetchDivisions(params)
  }

  return {
    divisions,
    loading,
    error,
    fetchDivisions
  }
}