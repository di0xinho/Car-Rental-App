<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { Car } from '@/utilities/models/carModel';
  import type { PropType } from 'vue';

  defineProps({
    car: {type: Object as PropType<Car>, required: true},
    backgroundClass: {type: String, default: 'bg-card-bg'},
    timeSlot: {type: Object as PropType<{from: string, to: string}>, required: true},
  });
</script>

<template>
  <div class="card min-w-xs" :class="backgroundClass">
    <div class="flex justify-between m-4">
      <div>
        <h4 class="text-xl font-semibold">
          {{ car.make + " " + car.model }}
        </h4>
        <h5 class="text-sm text-neutral-500">{{ car.bodyType }}</h5>
      </div>
      <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.44 0.100098C12.63 0.100098 11.01 0.980098 10 2.3301C8.99 0.980098 7.37 0.100098 5.56 0.100098C2.49 0.100098 0 2.6001 0 5.6901C0 6.8801 0.19 7.9801 0.52 9.0001C2.1 14.0001 6.97 16.9901 9.38 17.8101C9.72 17.9301 10.28 17.9301 10.62 17.8101C13.03 16.9901 17.9 14.0001 19.48 9.0001C19.81 7.9801 20 6.8801 20 5.6901C20 2.6001 17.51 0.100098 14.44 0.100098Z" fill="#ED3F3F"/>
      </svg>
    </div>
    <img 
      :src="car.imageUrl"
      alt="car in our offer"
      class="w-full min-h-56 aspect-3/2 object-cover"
    >
    <div class="flex justify-between m-4">
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
    <div class="flex justify-between items-center m-4">
      <div>
        <h4 class="text-xl font-semibold">{{ car.hourlyPrice }} ZŁ</h4>
        <h5 class="text-sm text-neutral-500">za godzinę</h5>
      </div>
      <RouterLink :to="{name: 'booking', query: {car_id: car._id, from: timeSlot.from, to: timeSlot.to} }" class="btn text-light-txt">
        Wynajmij
      </RouterLink>
    </div>
  </div>
</template>