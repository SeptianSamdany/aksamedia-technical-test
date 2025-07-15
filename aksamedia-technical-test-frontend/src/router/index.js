// routes/index.js - Updated Router Configuration
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import EmployeeView from '@/views/EmployeeView.vue'
import DivisionView from '@/views/DivisionView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { useAuth } from '@/composables/useAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/employees' 
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { 
        requiresAuth: false,
        title: 'Login'
      }
    },
    {
      path: '/employees',
      name: 'employees',
      component: EmployeeView,
      meta: { 
        requiresAuth: true,
        title: 'Employee Management'
      }
    },
    {
      path: '/divisions',
      name: 'divisions',
      component: DivisionView,
      meta: { 
        requiresAuth: true,
        title: 'Divisions'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: {
        title: 'Page Not Found'
      }
    }
  ]
})

// Navigation guard using composables
router.beforeEach(async (to, from, next) => {
  const { isAuthenticated, checkAuth } = useAuth()
  
  // Set page title
  document.title = to.meta.title ? `${to.meta.title} - Your App` : 'Your App'
  
  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    if (!isAuthenticated.value) {
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      })
      return
    }
    
    // Verify token is still valid
    try {
      await checkAuth()
    } catch (error) {
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      })
      return
    }
  }
  
  // If user is authenticated and trying to access login page
  if (to.name === 'login' && isAuthenticated.value) {
    const redirectTo = to.query.redirect || '/employees'
    next(redirectTo)
    return
  }
  
  next()
})

export default router