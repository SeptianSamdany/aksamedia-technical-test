<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'

const { login } = useAuth()
const router = useRouter()

const credentials = ref({
  username: '',
  password: ''
})

const errors = ref({
  username: [],
  password: [],
  general: []
})

const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  errors.value = { username: [], password: [], general: [] }
  
  try {
    console.log('Attempting login with:', credentials.value)
    
    // Ensure we're sending proper JSON data
    const loginData = {
      username: credentials.value.username,
      password: credentials.value.password
    }
    
    const response = await login(loginData)
    console.log('Login response:', response)
    
    if (response && response.data) {
      router.push('/dashboard')
    } else {
      throw new Error('Invalid response from server')
    }
  } catch (error) {
    console.error('Login error details:', {
      error: error,
      response: error.response,
      request: error.request,
      message: error.message
    })
    
    if (error.response) {
      // Handle different HTTP error statuses
      switch (error.response.status) {
        case 401:
          errors.value.general = ['Invalid credentials']
          break
        case 405:
          errors.value.general = ['Method not allowed - ensure backend accepts POST']
          break
        case 422:
          errors.value = { ...errors.value, ...error.response.data.errors }
          break
        default:
          errors.value.general = [`Server error (${error.response.status})`]
      }
    } else if (error.request) {
      errors.value.general = ['Network error - could not reach server']
    } else {
      errors.value.general = ['Login failed - please try again']
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Employee Management</h2>
        <p class="mt-2 text-center text-sm text-gray-600">Sign in to your account</p>
      </div>
      
      <!-- Error Display -->
      <div v-if="errors.general.length" class="rounded-md bg-red-50 p-4 mb-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">
              {{ errors.general[0] }}
            </h3>
          </div>
        </div>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              id="username"
              v-model="credentials.username"
              type="text"
              required
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :class="{ 'border-red-300': errors.username.length }"
              placeholder="Enter your username"
            />
            <p v-if="errors.username.length" class="mt-1 text-sm text-red-600">{{ errors.username[0] }}</p>
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              v-model="credentials.password"
              type="password"
              required
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :class="{ 'border-red-300': errors.password.length }"
              placeholder="Enter your password"
            />
            <p v-if="errors.password.length" class="mt-1 text-sm text-red-600">{{ errors.password[0] }}</p>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            :class="{ 'opacity-50 cursor-not-allowed': loading, 'bg-blue-600': !loading, 'bg-blue-400': loading }"
          >
            <span v-if="!loading">Sign in</span>
            <span v-else class="flex items-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>