<script setup>
import { onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { currentUser } = useAuth()

onMounted(() => {
  
})
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-4">Welcome, {{ currentUser.name }}!</h2>
      <p class="text-gray-600">This is your employee management dashboard.</p>
    </div>
  </div>
</template>