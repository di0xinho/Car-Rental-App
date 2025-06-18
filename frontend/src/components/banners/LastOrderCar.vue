<script setup lang="ts">
  import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="h-full p-4 sm:p-6 lg:p-12 xl:p-18 banner flex flex-col xs:flex-row justify-between gap-4 lg:gap-8 xl:gap-12">
    <div class="relative min-w-60 basis-3/5 self-center">
      <img src="/cars/bmw-x5-01.webp" alt="bmw x5" class="relative z-30">
      <RouterLink :to="{name: 'car-details', params: { id: 'bmw-x5' }}" class="absolute z-20 top-0 right-0 p-10 xl:p-15 bg-dominant-secondary rounded-full">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 2H28V22" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M28 2L2 28" stroke="white" stroke-width="4" stroke-linecap="round"/>
        </svg>
      </RouterLink>
    </div>
    <svg viewBox="0 0 10 10" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" class="flex-[0_0_2px]">
      <path d="M0 0H10V10H0V0Z" fill="white"/>
    </svg>
    <div class="bg-dominant-secondary flex flex-col gap-4 p-4 lg:p-8 text-center rounded-2xl">
      <h3 class="text-2xl lg:text-3xl xl:text-4xl my-auto text-dark-txt">
        BMW M2 SERIES
      </h3>
      <RouterLink :to="{name: 'rent'}" class="bg-dark-bg text-light-txt p-[6px] rounded-full">
        Wynajem
      </RouterLink>
    </div>
  </div>
</template>