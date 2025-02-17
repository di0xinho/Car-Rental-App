<script setup lang="ts">
  import CarCard from './CarCard.vue';

  const carsCollection = [
    {id: 'bmw-x5', model: 'BMW X5'},
    {id: 'mercedes-glc', model: 'Mercedes GLC'},
    {id: 'ford-kuga', model: 'Ford Kuga'},
    {id: 'nissan-qashqai', model: 'Nissan Qashqai'},
    {id: 'mazda-3', model: 'Mazda 3'},
    {id: 'audi-a6', model: 'Audi A6'}
  ];
</script>

<template>
  <ul class="grid grid-cols-[repeat(auto-fit,_minmax(22rem,_1fr))] p-8 gap-8">
    <li v-for="(car, index) in carsCollection" :key="index">
      <CarCard :index="index" :id="car.id" :model="car.model" />
    </li>
  </ul>
</template>