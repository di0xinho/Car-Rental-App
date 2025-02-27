import { createRouter, createWebHistory } from 'vue-router';
import 'vue-router';
import HomeView from '@/views/HomeView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import LoginView from '@/views/user/LoginView.vue';

import UserMainView from '@/views/user/UserMainView.vue';
import UserOrdersView from '../views/user/UserOrdersView.vue';
import UserAnaliticsView from '@/views/user/UserAnaliticsView.vue';
import UserRentView from '@/views/user/UserRentView.vue';
import UserSettingsView from '@/views/user/UserSettingsView.vue';

// Setting types for route meta data:  https://router.vuejs.org/guide/advanced/meta.html#TypeScript
declare module 'vue-router' {
  interface RouteMeta {
    layout?: 'UserLayout'|'AdminLayout'|'DefaultLayout'|'EmptyLayout',
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
        layout: 'DefaultLayout'
      },
    },
    {
      path: '/o-nas',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        layout: 'DefaultLayout'
      },
    },
    {
      path: '/rezerwacja',
      name: 'reservation',
      component: () => import('../views/ReservationView.vue'),
      meta: {
        layout: 'DefaultLayout'
      },
    },
    {
      path: '/cars',
      name: 'cars-collection',
      component: () => import('../views/CarsCollectionViev.vue'),
      meta: {
        layout: 'DefaultLayout'
      },
    },
    {
      path: '/cars/:model',
      name: 'cars-model',
      component: () => import('../views/CarModelView.vue'),
      meta: {
        layout: 'DefaultLayout'
      },
    },
    {
      path: '/kontakt',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: {
        layout: 'DefaultLayout'
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        layout: 'EmptyLayout'
      },
    },
    {
      path: '/user',
      children: [
        { path: '', name: 'user-main', component: UserMainView },
        { path: 'orders', name: 'user-orders', component: UserOrdersView },
        { path: 'analitics', name: 'user-analitics', component: UserAnaliticsView },
        { path: 'rent', name: 'user-rent', component: UserRentView },
        { path: 'settings', name: 'user-settings', component: UserSettingsView },
      ],
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
        layout: 'EmptyLayout'
      },
    },
  ],
})

export default router
