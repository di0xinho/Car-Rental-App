<script setup lang="ts">
  import AdminPanelNav from './layout-components/AdminPanelNav.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col gap-8">
    <header class="py-8 px-6 lg:px-16 flex justify-between items-center gap-16 bg-light-secondary-bg dark:bg-dark-secondary-bg">
      <RouterLink :to="{name: 'home'}" class="text-dominant-primary text-2xl sm:text-3xl">
        CARENT
      </RouterLink>
      <AdminPanelNav/>
    </header>
    <main class="grow bg-light-secondary-bg dark:bg-dark-secondary-bg">
      <slot/>
    </main>
  </div>
</template>