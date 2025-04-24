<script setup lang="ts">
  import CarViewCard from './CarViewCard.vue';
  import { Car } from '@/utilities/models/carModel';

  defineProps({
    cars: {type: Array<Car>, required: true}
  });
</script>

<template>
  <div>
    <ul class="flex overflow-hidden">
      <li v-for="(car, index) in cars" :key="index" class="basis-1/4 shrink-0 px-4">
        <CarViewCard :car="car" card-background="bg-light-bg"/>
      </li>
    </ul>
    <div class="flex justify-between my-8 mx-12 text-neutral-700">
      <button>
        <span class="text-2xl mr-2">&#8592;</span>
        <span class="text-lg">Previous</span>
      </button>
      <button>
        <span class="text-lg">Next</span>
        <span class="text-2xl ml-2">&#8594;</span>
      </button>
    </div>
  </div>
</template>