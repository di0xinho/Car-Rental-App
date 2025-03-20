<script setup lang="ts">
  import { fuelTypes } from '@/utilities/carModel';

  const fuel = defineModel('fuel', {type: String, required: true});
</script>

<template>
  <h3 class="text-sm text-neutral-600 my-4">RODZAJ PALIWA</h3>
  <div>
    <div v-for="(fuelType, index) in fuelTypes" :key="index" class="my-8">
      <input type="radio" :id="fuelType" :value="fuelType.toLowerCase()" v-model="fuel">
      <label :for="fuelType" class="ml-3">{{ fuelType }}</label>
    </div>
  </div>
</template>