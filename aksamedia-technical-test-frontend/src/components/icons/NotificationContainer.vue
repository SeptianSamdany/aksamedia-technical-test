<template>
  <div class="fixed top-4 right-4 z-[9999] space-y-3 w-full max-w-xs">
    <TransitionGroup 
      name="notification"
      tag="div"
    >
      <div
        v-for="notification in notifications"
        v-show="notification.show"
        :key="notification.id"
        :class="[
          'w-full bg-white shadow-xl rounded-lg pointer-events-auto overflow-hidden transform transition-all',
          'border-l-4',
          notificationTypeClasses[notification.type].border,
          notification.show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        ]"
      >
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <component 
                :is="notificationIcons[notification.type]" 
                :class="['h-5 w-5', notificationTypeClasses[notification.type].icon]" 
              />
            </div>
            <div class="ml-3 flex-1">
              <p class="text-sm font-medium text-gray-900">
                {{ notification.message }}
              </p>
              <p v-if="notification.description" class="mt-1 text-sm text-gray-500">
                {{ notification.description }}
              </p>
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button
                @click="removeNotification(notification.id)"
                class="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                :class="notificationTypeClasses[notification.type].focus"
              >
                <span class="sr-only">Close</span>
                <XMarkIcon class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        <!-- Progress bar -->
        <div 
          v-if="!notification.persistent"
          class="h-1 bg-gray-200"
        >
          <div
            :class="['h-full', notificationTypeClasses[notification.type].progress]"
            :style="{
              animation: `progress ${notification.duration}ms linear forwards`,
              'animation-play-state': notification.paused ? 'paused' : 'running'
            }"
            @mouseenter="pauseProgress(notification.id)"
            @mouseleave="resumeProgress(notification.id)"
          ></div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { useNotifications } from '@/composables/useNotifications'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/vue/24/solid'

const { notifications, removeNotification } = useNotifications()

const notificationIcons = {
  success: CheckCircleIcon,
  error: ExclamationCircleIcon,
  warning: ExclamationTriangleIcon,
  info: InformationCircleIcon
}

const notificationTypeClasses = {
  success: {
    border: 'border-green-500',
    icon: 'text-green-500',
    progress: 'bg-green-500',
    focus: 'focus:ring-green-500'
  },
  error: {
    border: 'border-red-500',
    icon: 'text-red-500',
    progress: 'bg-red-500',
    focus: 'focus:ring-red-500'
  },
  warning: {
    border: 'border-yellow-500',
    icon: 'text-yellow-500',
    progress: 'bg-yellow-500',
    focus: 'focus:ring-yellow-500'
  },
  info: {
    border: 'border-blue-500',
    icon: 'text-blue-500',
    progress: 'bg-blue-500',
    focus: 'focus:ring-blue-500'
  }
}

// Pause progress bar on hover
const pauseProgress = (id) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) notification.paused = true
}

const resumeProgress = (id) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) notification.paused = false
}
</script>

<style>
@keyframes progress {
  from { width: 100%; }
  to { width: 0%; }
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}
.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>