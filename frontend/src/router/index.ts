import { createRouter, createWebHistory } from 'vue-router';
import 'vue-router';
import HomeView from '@/views/HomeView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import LoginView from '@/views/LoginView.vue';
  // User Panel Views Chunk:
  // ( https://router.vuejs.org/guide/advanced/lazy-loading.html )
import UserMainView from '@/views/user/UserMainView.vue';
import UserOrdersView from '@/views/user/UserOrdersView.vue';
import UserAnaliticsView from '@/views/user/UserAnaliticsView.vue';
import UserSettingsView from '@/views/user/UserSettingsView.vue';
import UserRentCarView from '@/views/user/UserRentCarView.vue';

import useUser from '@/composables/useUser';

  // Setting types for route meta data:
  // https://router.vuejs.org/guide/advanced/meta.html#TypeScript
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
      path: '/wynajem',
      name: 'rent',
      component: () => import('../views/RentCarView.vue'),
      meta: {
        layout: 'DefaultLayout'
      },
    },
    {
      path: '/rezerwacja',
      name: 'booking',
      component: () => import('../views/BookingView.vue'),
      beforeEnter: (to, from) => {
        console.log(to.query);
        if (!to.query.car_id || !to.query.from || !to.query.to || !to.query.city) {
          return {name: 'not-found'};
        }
        const { user } = useUser();
        if (!user.value) {
          return {name: 'login'};
        }
        return true;
      },
      meta: {
        layout: 'DefaultLayout'
      },
    },
    {
      path: '/samochody',
      name: 'cars-collection',
      component: () => import('../views/CarsCollectionViev.vue'),
      meta: {
        layout: 'DefaultLayout'
      },
    },
    {
      path: '/samochody/:model',
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
      beforeEnter: (to, from) => {
        if (to.query.mode !== 'login' && to.query.mode !== 'signin') {
          return {name: 'login', query: {mode: 'login'}};
        } 
      },
      meta: {
        layout: 'EmptyLayout'
      },
    },
    {
      path: '/user',
      children: [
        { path: '', name: 'user-main', component: UserMainView },
        { path: 'zamowienia', name: 'user-orders', component: UserOrdersView },
        { path: 'analityka', name: 'user-analitics', component: UserAnaliticsView },
        { path: 'wynajem', name: 'user-rent', component: UserRentCarView },
        { path: 'ustawienia', name: 'user-settings', component: UserSettingsView },
      ],
      beforeEnter: (to, from) => {
        const { user } = useUser();
        if (user.value) return true;
        else return {name: 'login'};
      },
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
