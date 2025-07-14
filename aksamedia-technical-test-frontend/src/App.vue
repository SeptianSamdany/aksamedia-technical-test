<!-- App.vue -->
<script setup>
import { RouterView } from 'vue-router'
import AppHeader from '@/components/common/AppHeader.vue'
import AppSidebar from '@/components/common/AppSidebar.vue'
import { useAuthStore } from '@/stores/auth'
import { computed, ref } from 'vue'

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)
const sidebarOpen = ref(false)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <AppHeader 
      v-if="isAuthenticated" 
      @toggle-sidebar="toggleSidebar"
      :sidebar-open="sidebarOpen"
    />
    
    <div v-if="isAuthenticated" class="flex">
      <AppSidebar 
        :open="sidebarOpen"
        @close="closeSidebar"
      />
      
      <!-- Overlay for mobile -->
      <div 
        v-if="sidebarOpen"
        class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        @click="closeSidebar"
      ></div>
      
      <main class="flex-1 transition-all duration-300 ease-in-out">
        <div class="p-4 sm:p-6 lg:p-8">
          <RouterView />
        </div>
      </main>
    </div>
    
    <RouterView v-else />
  </div>
</template>

<style scoped>
/* Custom scrollbar for better UX */
:deep(*) {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

:deep(*::-webkit-scrollbar) {
  width: 6px;
}

:deep(*::-webkit-scrollbar-track) {
  background: transparent;
}

:deep(*::-webkit-scrollbar-thumb) {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

:deep(*::-webkit-scrollbar-thumb:hover) {
  background-color: rgba(156, 163, 175, 0.7);
}
</style>