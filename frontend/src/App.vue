<script setup lang="ts">
  import { ref, provide, onMounted } from 'vue';
  import { RouterView } from 'vue-router'
  import AdminLayout from '@/components/layouts/AdminLayout.vue';
  import UserLayout from '@/components/layouts/UserLayout.vue';
  import DefaultLayout from '@/components/layouts/DefaultLayout.vue';
  import EmptyLayout from '@/components/layouts/EmptyLayout.vue';

  const layout = {
    "AdminLayout": AdminLayout,
    "UserLayout": UserLayout,
    "DefaultLayout": DefaultLayout,
    "EmptyLayout": EmptyLayout
  } 

  const darkMode = ref(false);

  function toggleDarkMode () {
    darkMode.value = !darkMode.value;
    if (darkMode.value) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  provide('darkMode', { darkMode, toggleDarkMode });
</script>

<template>
    <component :is="layout[$route.meta.layout ?? 'DefaultLayout']">
      <RouterView />
    </component>
</template>