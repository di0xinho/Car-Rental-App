<script setup lang="ts">
  import { ref } from 'vue';
  import DarkModeSwitch from '../common-components/DarkModeSwitch.vue';
  
  const open = ref(false);
</script>

<template>
  <div>
    <button type="button" @click="open = true">
      <svg width="48" height="40" viewBox="0 0 48 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="6" fill="white"/>
        <rect y="17" width="48" height="6" fill="white"/>
        <rect y="34" width="48" height="6" fill="white"/>
      </svg>
    </button>
    <div class="fixed z-20 top-0 left-0 w-screen bg-neutral-100/75 transition-opacity duration-1000 ease-linear" :class="{'h-screen': open}">
      <Transition
        enter-from-class="-translate-x-full"
        leave-to-class="-translate-x-full"
      >
        <nav v-show="open" class="absolute z-30 left-0 top-0 w-3/5 min-w-xs h-screen bg-light-bg text-dark-txt p-12 flex flex-col gap-24 transition-transform duration-250 ease-linear">
          <button type="button" @click="open = false" class="self-end">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="black" stroke-width="2" stroke-linecap="round">
              <path d="M1 19L19 1"/>
              <path d="M1 1L19 19"/>
            </svg>
          </button>
          <ul class="flex flex-col gap-8 ml-12" @click="open = false">
            <li>
              <RouterLink :to="{name: 'home'}">Główna</RouterLink>
            </li>
            <li>
              <RouterLink :to="{name: 'about'}">O nas</RouterLink>
            </li>
            <li>
              <RouterLink :to="{name: 'rent'}">Wynajem</RouterLink>
            </li>
            <li>
              <RouterLink :to="{name: 'cars-collection'}">Samochody</RouterLink>
            </li>
            <li>
              <RouterLink :to="{name: 'contact'}">Kontakt</RouterLink>
            </li>
          </ul>
          <DarkModeSwitch class="mt-auto ml-12"/>
        </nav>
      </Transition>
    </div>
  </div>
</template>