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
    <template v-if="isAuthenticated">
      <!-- Layout container -->
      <div class="flex h-screen">
        <!-- Sidebar -->
        <AppSidebar 
          :open="sidebarOpen"
          @close="closeSidebar"
        />
        
        <!-- Mobile overlay -->
        <div 
          v-if="sidebarOpen"
          class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          @click="closeSidebar"
        ></div>
        
        <!-- Main content area -->
        <div class="flex-1 flex flex-col min-w-0">
          <!-- Header -->
          <AppHeader 
            @toggle-sidebar="toggleSidebar"
            :sidebar-open="sidebarOpen"
          />
          
          <!-- Main content -->
          <main class="flex-1 overflow-auto">
            <div class="p-4 sm:p-6 lg:p-8">
              <RouterView />
            </div>
          </main>
        </div>
      </div>
    </template>
    
    <!-- Auth views (login, register, etc.) -->
    <RouterView v-else />
  </div>
</template>
