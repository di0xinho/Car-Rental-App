<script setup lang="ts">
  import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="h-full px-20 py-8 bg-dominant-primary rounded-large flex justify-between gap-15">
    <div class="relative basis-xl h-full flex">
      <img src="/cars/bmw-x5-01.webp" alt="bmw x5" class="relative z-30 min-w-xs my-auto">
      <RouterLink :to="{name: 'cars-model', params: { model: 'bmw-x5' }}" class="absolute z-20 top-0 right-0 p-15 bg-dominant-secondary rounded-full">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 2H28V22" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M28 2L2 28" stroke="white" stroke-width="4" stroke-linecap="round"/>
        </svg>
      </RouterLink>
    </div>
    <svg viewBox="0 0 1 102" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" vector-effect="non-scaling-stroke" class="flex-[0_0_1px]">
      <path d="M0.5 101L0.499996 1" stroke="white" stroke-linecap="round"/>
    </svg>
    <div class="bg-dominant-secondary basis-sm grow-0 shrink-0 flex flex-col p-8 text-center rounded-medium self-stretch">
      <h3 class="text-4xl my-auto">BMW M2 SERIES</h3>
      <RouterLink :to="{name: 'rent'}" class="bg-neutral-900 text-neutral-50 p-[6px] rounded-full">
        Wynajem
      </RouterLink>
    </div>
  </div>
</template>