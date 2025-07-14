<!-- AppSidebar.vue -->
<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const route = useRoute()
const currentPath = computed(() => route.path)

const menuItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v4H8V5z" />
    </svg>`
  },
  {
    name: 'Employees',
    path: '/employees',
    icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
    </svg>`
  }
]

const handleLinkClick = () => {
  emit('close')
}
</script>

<template>
  <aside 
    class="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0"
    :class="{
      'translate-x-0': open,
      '-translate-x-full': !open
    }"
  >
    <!-- Sidebar Header -->
    <div class="flex items-center justify-between p-4 border-b border-gray-200">
      <div class="flex items-center space-x-2">
        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <span class="text-lg font-semibold text-gray-900">EMS</span>
      </div>
      
      <!-- Close button for mobile -->
      <button 
        @click="$emit('close')"
        class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-4 space-y-2">
      <div class="mb-6">
        <h3 class="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Main Menu
        </h3>
      </div>
      
      <ul class="space-y-1">
        <li v-for="item in menuItems" :key="item.path">
          <RouterLink
            :to="item.path"
            @click="handleLinkClick"
            class="group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-gray-50"
            :class="{
              'bg-blue-50 text-blue-700 border-r-2 border-blue-600': currentPath === item.path,
              'text-gray-700 hover:text-gray-900': currentPath !== item.path
            }"
          >
            <span 
              class="mr-3 flex-shrink-0 transition-colors duration-200"
              :class="{
                'text-blue-600': currentPath === item.path,
                'text-gray-400 group-hover:text-gray-500': currentPath !== item.path
              }"
              v-html="item.icon"
            ></span>
            <span>{{ item.name }}</span>
            
            <!-- Active indicator -->
            <span 
              v-if="currentPath === item.path"
              class="ml-auto w-2 h-2 bg-blue-600 rounded-full"
            ></span>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <!-- Sidebar Footer -->
    <div class="p-4 border-t border-gray-200">
      <div class="flex items-center p-3 rounded-lg bg-gray-50">
        <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span class="text-white text-sm font-medium">A</span>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-900">Admin User</p>
          <p class="text-xs text-gray-500">Online</p>
        </div>
      </div>
    </div>
  </aside>
</template>