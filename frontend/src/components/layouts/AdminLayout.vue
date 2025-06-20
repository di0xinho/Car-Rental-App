<script setup lang="ts">
  import AdminPanelNav from './layout-components/AdminPanelNav.vue';
</script>

<template>
  <div class="h-screen flex flex-col gap-8 dark:text-light-txt">
    <header class="py-8 px-4 sm:px-8 lg:px-16 flex justify-between items-center gap-12 bg-light-secondary-bg dark:bg-dark-secondary-bg">
      <RouterLink :to="{name: 'home'}" class="text-dominant-primary text-2xl sm:text-3xl">
        CARENT
      </RouterLink>
      <AdminPanelNav/>
    </header>
    <main class="grow bg-light-secondary-bg dark:bg-dark-secondary-bg overflow-y-scroll">
      <slot/>
    </main>
  </div>
</template>