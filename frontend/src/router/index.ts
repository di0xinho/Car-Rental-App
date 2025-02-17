import { createRouter, createWebHistory } from 'vue-router'
import 'vue-router'
import HomeView from '@/views/user/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

// Setting types for route meta data:  https://router.vuejs.org/guide/advanced/meta.html#TypeScript
declare module 'vue-router' {
  interface RouteMeta {
    layout?: 'UserLayout'|'AdminLayout'|'DefaultLayout',
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        layout: 'UserLayout'
      },
    },
    {
      path: '/o-nas',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/user/AboutView.vue'),
      meta: {
        layout: 'UserLayout'
      },
    },
    {
      path: '/rezerwacja',
      name: 'reservation',
      component: () => import('../views/user/ReservationView.vue'),
      meta: {
        layout: 'UserLayout'
      },
    },
    {
      path: '/kontakt',
      name: 'contact',
      component: () => import('../views/user/ContactView.vue'),
      meta: {
        layout: 'UserLayout'
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/user/LoginView.vue'),
      meta: {
        layout: 'UserLayout'
      },
    },
    {
      path: '/user',
      name: 'user-panel',
      component: () => import('../views/user/UserPanelView.vue'),
      meta: {
        layout: 'UserLayout'
      },
    },
    {
      path: '/car/:model',
      name: 'car-model',
      component: () => import('../views/user/CarModelView.vue'),
      meta: {
        layout: 'UserLayout'
      },
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/admin/AdminDashboardView.vue'),
      meta: {
        layout: 'AdminLayout'
      }
    },
    {
      path: '/:pathSegment(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: {
        layout: 'DefaultLayout'
      },
    },

  ],
})

export default router
