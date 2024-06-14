import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import Dashboard from '@/views/DashboardView.vue'
import LogView from '@/views/LogCrud/LogView.vue'
import AddLog from '@/views/LogCrud/AddLog.vue'
import EditLog from '@/views/LogCrud/EditLog.vue'
import NotFound from '@/views/NotFound.vue'
import LayoutView from '@/components/LayoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        needsAuth: false
      }
    },
    {
      path: '/',
      redirect: '/login',
      component: LayoutView,
      meta: {
        needsAuth: false
      },
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: Dashboard,
          meta: {
            needsAuth: true
          }
          // beforeEnter(to) {
          //   alert('Please Login First')
          //   if (to.name !== 'dashboard') {
          //     return '/login'
          //   }
          // }
        },
        // schedule route
        {
          path: '/log',
          name: 'log',
          component: LogView,
          meta: {
            needsAuth: true
          }
        },
        {
          path: '/add_log',
          name: 'add_log',
          component: AddLog,
          meta: {
            needsAuth: true
          }
        },
        {
          path: '/log/:id',
          name: 'edit_log',
          component: EditLog,
          meta: {
            needsAuth: true
          }
        },
        {
          path: '/:catchAll(.*)',
          name: '404Name',
          redirect: '/login',
          component: NotFound,
          meta: {
            needsAuth: false
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.needsAuth) {
    if (localStorage.getItem('user') === null) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    if (to.name == 'login') {
      if (localStorage.getItem('user') !== null) {
        console.log('ke dashboard')
        next({ name: 'dashboard' })
      } else {
        next()
      }
    }
  }
})

export default router
