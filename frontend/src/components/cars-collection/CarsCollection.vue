<script setup lang="ts">
  import CarViewCard from './CarViewCard.vue';
  import { Car } from '@/utilities/carModel';

  defineProps({
    cars: {type: Array<Car>, required: true}
  });
</script>

<template>
  <ul class="grid grid-cols-[repeat(auto-fill,_minmax(22rem,_1fr))] p-8 gap-8">
    <li v-for="(car, index) in cars" :key="index">
      <CarViewCard :index="index" :id="car._id" :model="car.model" />
    </li>
  </ul>
</template>