<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { Car } from '@/utilities/models/carModel';
  import type { PropType } from 'vue';

  defineProps({
    car: {type: Object as PropType<Car>, required: true},
    cardBackground: {type: String},
  });
</script>

<template>
  <div class="card min-w-2xs" :class="cardBackground ?? ''">
    <img 
      :src="car.imageUrl"
      alt="car in our offer"
      class="w-full min-h-56 aspect-3/2 object-cover"
    >
    <div class="flex justify-between m-4">
      <div>
        <h4 class="text-xl font-semibold">
          {{ car.make + " " + car.model }}
        </h4>
        <h5 class="text-sm text-neutral-500">{{ car.bodyType }}</h5>
      </div>
      <div>
        <h4 class="text-xl font-semibold text-dominant-primary text-right">
          {{ car.hourlyPrice}} ZŁ
        </h4>
        <h5 class="text-sm text-neutral-500">za godzinę</h5>
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
        <h6>{{ car.capacity }} {{ car.capacity < 5 ? "Osoby" : "Osób" }}</h6>
      </div>
    </div>
    <RouterLink :to="{name: 'cars-model', params: {model: car._id}}" class="m-4 btn text-light-txt">
      Zobacz szczegóły
    </RouterLink>
  </div>
</template>