<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AdminLayout from '@/components/layouts/AdminLayout.vue';
import UserLayout from '@/components/layouts/UserLayout.vue';
import DefaultLayout from '@/components/layouts/DefaultLayout.vue';

const layout = {
  "AdminLayout": AdminLayout,
  "UserLayout": UserLayout,
  "DefaultLayout": DefaultLayout
}
</script>

<template>
    <component :is="layout[$route.meta.layout ?? 'DefaultLayout']">
      <RouterView />
    </component>
</template>