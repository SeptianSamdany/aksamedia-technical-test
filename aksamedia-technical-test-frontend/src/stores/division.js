import { defineStore } from 'pinia'
import { useDivisions } from '@/composables/useDivisions'

export const useDivisionStore = defineStore('division', () => {
  const divisions = useDivisions()
  
  return {
    ...divisions
  }
})