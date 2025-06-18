import { createRouter, createWebHistory } from 'vue-router';
import 'vue-router';
import HomeView from '@/views/HomeView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import LoginView from '@/views/LoginView.vue';
  // User Panel Views Chunk:
  // ( https://router.vuejs.org/guide/advanced/lazy-loading.html )
import UserMainView from '@/views/user/UserMainView.vue';
import UserBookingsView from '@/views/user/UserBookingsView.vue';
import UserHistoryView from '@/views/user/UserHistoryView.vue';
import UserSettingsView from '@/views/user/UserSettingsView.vue';
import UserRentCarView from '@/views/user/UserRentCarView.vue';

import AdminDashboardView from '@/views/admin/AdminDashboardView.vue';
import AdminCarsView from '@/views/admin/AdminCarsView.vue';
import AdminBookingsView from '@/views/admin/AdminBookingsView.vue';
import AdminRentsView from '@/views/admin/AdminRentsView.vue';
import AdminHistoryView from '@/views/admin/AdminHistoryView.vue';
import AdminAddCar from '@/views/admin/AdminAddCar.vue';
import AdminUpdateCar from '@/views/admin/AdminUpdateCar.vue';

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
        if (!to.query.car_id || !to.query.from || !to.query.to) {
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
      path: '/rezerwacja/dodano-rezerwacje',
      name: 'booking-success',
      component: () => import('../views/BookingSuccessView.vue'),
      beforeEnter: (to, from) => {
        if (!to.query.car_id || !to.query.from || !to.query.to || !to.query.payment || !to.query.total_price) {
          return {name: 'not-found'};
        }
        return true;
      },
      meta: {
        layout: 'EmptyLayout'
      }
    },
    {
      path: '/rezerwacja/zakonczona-niepowodzeniem',
      name: 'booking-failure',
      component: () => import('../views/BookingFailureView.vue'),
      meta: {
        layout: 'EmptyLayout'
      }
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
      path: '/samochody/:id',
      name: 'car-details',
      component: () => import('../views/CarDetailsView.vue'),
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
        { path: 'zamowienia', name: 'user-bookings', component: UserBookingsView },
        { path: 'historia', name: 'user-history', component: UserHistoryView },
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
      path: '/admin',
      children: [
        {path: '', name: 'admin-dashboard', component: AdminDashboardView},
        {path: 'samochody', name: 'admin-cars', component: AdminCarsView},
        {path: 'samochody/nowy', name: 'admin-add-car', component: AdminAddCar},
        {path: 'samochody/edytuj/:id', name: 'admin-edit-car', component: AdminUpdateCar},
        {path: 'rezerwacje', name: 'admin-bookings', component: AdminBookingsView},
        {path: 'historia', name: 'admin-history', component: AdminHistoryView},
        {path: 'wynajem', name: 'admin-rents', component: AdminRentsView},
      ],
      beforeEnter: (to, from) => {
        console.log('entering ADMIN ROUTES');
      },
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
