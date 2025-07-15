import { ref } from 'vue'

const notifications = ref([])
let notificationId = 0

export function useNotifications() {
  const addNotification = (notification) => {
    const id = ++notificationId
    const defaults = {
      id,
      duration: 4000,
      show: true,
      type: 'info',
      persistent: false
    }
    
    const fullNotification = { ...defaults, ...notification }
    notifications.value.push(fullNotification)
    
    if (!fullNotification.persistent) {
      setTimeout(() => {
        removeNotification(id)
      }, fullNotification.duration)
    }
    
    return id
  }
  
  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      // Tambahkan animasi sebelum menghapus
      notifications.value[index].show = false
      setTimeout(() => {
        notifications.value.splice(index, 1)
      }, 300) // Sesuaikan dengan durasi animasi
    }
  }
  
  const clearAll = () => {
    notifications.value.forEach(n => (n.show = false))
    setTimeout(() => {
      notifications.value = []
    }, 300)
  }
  
  // Helper methods
  const success = (message, options = {}) => 
    addNotification({ message, type: 'success', ...options })
  
  const error = (message, options = {}) => 
    addNotification({ message, type: 'error', ...options })
  
  const warning = (message, options = {}) => 
    addNotification({ message, type: 'warning', ...options })
  
  const info = (message, options = {}) => 
    addNotification({ message, type: 'info', ...options })
  
  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info
  }
}