<script setup lang="ts">
  import CarViewCard from './CarViewCard.vue';
  import HorizontalList from '../ui-common/HorizontalList.vue';
  import { Car } from '@/utilities/models/carModel';

  defineProps({
    cars: {type: Array<Car>, required: true}
  });
</script>

<template>
  <HorizontalList>
    <li v-for="(car, index) in cars" :key="index" class="min-w-xs basis-[calc(1/4_*_(100%_-_96px))] shrink-0 grow">
      <CarViewCard :car="car" card-background="bg-light-bg"/>
    </li>
  </HorizontalList>
</template>