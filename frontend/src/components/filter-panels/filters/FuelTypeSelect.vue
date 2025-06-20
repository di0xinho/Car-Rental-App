<script setup lang="ts">
 import { computed, ref } from 'vue';
  import { fuelTypes } from '@/utilities/models/carModel';

  const fuel = defineModel('fuel', {type: String, required: true});

  const label = computed(() => {
    if (fuel.value.length > 0) {
      return fuel.value.toString();
    } else {
      return 'Wybierz rodzaj paliwa';
    }
  });

  const openOptions = ref(false);
</script>

<template>
 <div class="relative bg-light-bg group text-black">
    <button @click="openOptions = !openOptions" class="w-full flex gap-4 items-center justify-between p-4">
      <span class="max-w-[calc(100%_-_36px)] truncate">
        {{ label }}
      </span>
      <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg" :class="{'rotate-180': openOptions}">
        <path d="M1 3L10 13L19 3" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <div class="absolute w-full group-hover:block bg-light-bg z-20" :class="{ hidden: !openOptions }">
      <div class="m-8" v-for="(fuelType, index) in fuelTypes" :key="index">
        <input type="radio" :id="fuelType" :value="fuelType" v-model="fuel">
        <label :for="fuelType" class="ml-3">{{ fuelType }}</label>
      </div>
    </div>
  </div>
</template>