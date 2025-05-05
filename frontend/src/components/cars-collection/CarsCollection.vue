<script setup lang="ts">
  import CarViewCard from './CarViewCard.vue';
  import { Car } from '@/utilities/models/carModel';

  defineProps({
    cars: {type: Array<Car>, required: true}
  });
</script>

<template>
  <ul class="grid grid-cols-[repeat(auto-fill,_minmax(20rem,_max-content))] gap-8 justify-center">
    <li v-for="(car, index) in cars" :key="index" class="max-w-md">
      <CarViewCard :car="car" />
    </li>
  </ul>
</template>