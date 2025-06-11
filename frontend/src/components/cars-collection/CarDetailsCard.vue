<script setup lang="ts">
  import CarCapacityDetail from '@/components/cars-collection/car-details/CarCapacityDetail.vue';
  import CarFuelDetail from '@/components/cars-collection/car-details/CarFuelDetail.vue';
  import CarGearboxDetail from '@/components/cars-collection/car-details/CarGearboxDetail.vue';
  import CarYearDetail from '@/components/cars-collection/car-details/CarYearDetail.vue';
  import CarMileageDetail from '@/components/cars-collection/car-details/CarMileageDetail.vue';
  import CarColorDetail from '@/components/cars-collection/car-details/CarColorDetail.vue';
  import type { Car } from '@/utilities/models/carModel';
  import { ref, type PropType } from 'vue';

  defineProps({
    car: {type: Object as PropType<Car>, required: true}
  });

  const openImg = ref(false);
</script>

<template>
  <div class="relative bg-light-secondary-bg rounded-lg overflow-hidden p-2">
    <div class="flex gap-2">
      <!-- Image to be expanded after clicking a button -->
      <div class="basis-2/5 h-24">
        <div class="absolute" :class="{'w-[calc((100%_-_16px)_*_2_/_5)] h-24': !openImg, 'h-full w-full top-0 left-0': openImg}">
          <img :src="car.imageUrl" alt="booked car" class="w-full h-full object-cover rounded-lg">
          <button class="absolute bottom-2 right-2" :class="{'rotate-180': openImg}" @click="openImg = !openImg">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#FF9E0C"/>
            <path d="M23.0711 23.0711L8.92896 8.92896" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <path d="M13.1716 24.4853L23.0711 23.0711L24.4853 13.1716" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="my-2 mx-auto">
        <h4 class="text-2xl font-semibold">
          {{ car.make + " " + car.model }}
        </h4>
        <h5 class="text-sm text-neutral-500">
          {{ car.bodyType }}
        </h5>
      </div>
    </div>
    <dl class="xs:mx-4 mt-6 mb-2 grid grid-cols-2 gap-x-4 xs:gap-x-8 gap-y-4">
      <CarFuelDetail :fuel-type="car.fuelType" />
      <CarGearboxDetail :gearbox-type="car.gearboxType" />
      <CarYearDetail :year="car.year" />
      <CarCapacityDetail :capacity="car.capacity" />
      <CarMileageDetail :mileage="car.mileage" />
      <CarColorDetail :color="car.color" />
    </dl>
  </div>
</template>