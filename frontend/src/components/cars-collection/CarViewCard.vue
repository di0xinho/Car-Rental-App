<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { Car } from '@/utilities/carModel';
  import type { PropType } from 'vue';

  defineProps({
    car: {type: Object as PropType<Car>, required: true},
  });
</script>

<template>
  <div class="card">
    <img 
      :src="`/cars/${car.imageUrl}`"
      alt="car in our offer"
      class="w-full"
    >
    <div class="flex justify-between m-4">
      <div>
        <h4 class="text-xl font-semibold">{{ car.make + " " + car.model }}</h4>
        <h5>{{ car.bodyType }}</h5>
      </div>
      <div>
        <h4 class="text-xl font-semibold text-dominant-primary">
          {{ car.price }} ZŁ
        </h4>
        <h5>/za dzień</h5>
      </div>
    </div>
    <div class="flex justify-between m-4 ">
      <div>
        <h6>{{ car.gearboxType }}</h6>
      </div>
      <div>
        <h6>{{ car.fuelType }}</h6>
      </div>
      <div>
        <h6>{{ car.capacity }} Osoby</h6>
      </div>
    </div>
    <RouterLink :to="{name: 'cars-model', params: {model: car._id}}" class="m-4 btn text-light-txt">
      Zobacz szczegóły
    </RouterLink>
  </div>
</template>