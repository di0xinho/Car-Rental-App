<script setup lang="ts">
  import { inject } from 'vue';

  const { darkMode, toggleDarkMode } = inject('darkMode') as { darkMode: boolean, toggleDarkMode: ()=>void };

  defineProps({
    labelClass: {type: String, default: ''}
  });
</script>

<template>
  <div class="flex gap-x-4 items-center">
    <label for="dark-mode" :class="labelClass">Dark Mode</label>
    <input id="dark-mode" type="checkbox" :checked="darkMode" @change="toggleDarkMode" class="w-20 h-8 appearance-none bg-neutral-200/40 rounded-full p-1 before:block before:bg-dominant-primary before:h-full before:w-6 before:rounded-full checked:before:ml-12 cursor-pointer">
  </div>
</template>