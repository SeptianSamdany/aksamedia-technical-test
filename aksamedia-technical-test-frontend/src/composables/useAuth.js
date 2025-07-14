import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

export function useAuth() {
  const authStore = useAuthStore()

  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const currentUser = computed(() => authStore.currentUser)

  const login = async (credentials) => {
    return await authStore.login(credentials)
  }

  const logout = async () => {
    return await authStore.logout()
  }

  return {
    isAuthenticated,
    currentUser,
    login,
    logout
  }
}