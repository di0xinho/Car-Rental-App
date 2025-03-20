<script setup lang="ts">
  import CarViewCard from './CarViewCard.vue';
  import { Car } from '@/utilities/carModel';

  defineProps({
    cars: {type: Array<Car>, required: true}
  });
</script>

<template>
  <ul class="grid grid-cols-[repeat(auto-fill,_minmax(20rem,_1fr))] gap-8">
    <li v-for="(car, index) in cars" :key="index">
      <CarViewCard :car="car" />
    </li>
  </ul>
</template>