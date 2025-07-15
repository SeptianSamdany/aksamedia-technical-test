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
    name: 'Divisions',
    path: '/divisions',
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
    class="w-60 bg-white border-r border-gray-200 flex-shrink-0 transition-transform duration-300 ease-in-out lg:translate-x-0 z-50"
    :class="{
      'translate-x-0': open,
      '-translate-x-full': !open
    }"
  >
    <!-- Sidebar Header -->
    <div class="flex items-center p-6 border-b border-gray-100">
      <div class="flex items-center space-x-3">
        <div class="w-7 h-7 bg-gray-900 rounded-md flex items-center justify-center">
          <span class="text-white text-sm font-bold">E</span>
        </div>
        <span class="text-lg font-bold text-gray-900">EMS</span>
      </div>
      
      <!-- Close button for mobile -->
      <button 
        @click="$emit('close')"
        class="lg:hidden ml-auto p-1 rounded-md text-gray-400 hover:text-gray-600 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-4 overflow-y-auto">
      <ul class="space-y-1">
        <li v-for="item in menuItems" :key="item.path">
          <RouterLink
            :to="item.path"
            @click="handleLinkClick"
            class="group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200"
            :class="{
              'bg-gray-900 text-white': currentPath === item.path,
              'text-gray-700 hover:bg-gray-100 hover:text-gray-900': currentPath !== item.path
            }"
          >
            <span 
              class="mr-3 flex-shrink-0 transition-colors duration-200"
              :class="{
                'text-white': currentPath === item.path,
                'text-gray-500 group-hover:text-gray-700': currentPath !== item.path
              }"
              v-html="item.icon"
            ></span>
            <span>{{ item.name }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <!-- Sidebar Footer -->
    <div class="p-2 border-t border-gray-200 fixed bottom-0 left-0 w-60 bg-white">
      <div class="flex items-center p-3 rounded-md">
        <div class="w-7 h-7 bg-gray-700 rounded-full flex items-center justify-center">
          <span class="text-white text-sm font-medium">A</span>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-900">Admin</p>
          <p class="text-xs text-gray-500">Administrator</p>
        </div>
      </div>
    </div>
  </aside>
</template>