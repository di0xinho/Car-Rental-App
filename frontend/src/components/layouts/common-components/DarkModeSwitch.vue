<script setup lang="ts">
  import { inject } from 'vue';
  const { darkMode, toggleDarkMode } = inject('darkMode') as { darkMode: boolean, toggleDarkMode: ()=>void };
</script>

<template>
  <div class="flex gap-2 items-center">
    <label for="dark-mode">Dark Mode</label>
    <input id="dark-mode" type="checkbox" :checked="darkMode" @change="toggleDarkMode" class="w-24 h-12 appearance-none bg-neutral-100 rounded-full p-1 before:block before:bg-dominant-primary before:h-full before:w-10 before:rounded-full checked:before:ml-12 cursor-pointer">
  </div>
</template>