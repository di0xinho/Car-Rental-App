<script setup lang="ts">
  import CarsCollection from '@/components/cars-collection/CarsCollection.vue';
  import CarPriceFilter from '@/components/filter-panels/CarPriceFilter.vue';
  import { Car } from '@/utilities/carModel';
  import { ref, computed } from 'vue';

  const type = ref<string[]>([]);
  const price = ref('400');

  // Mocking cars data:
  import json from '../../../mock_data/db.json';
  const cars = json['get-all-cars'].data as Car[];

  const fiteredCars = computed(() => {
    return cars.filter(car => {
      if (car.dailyPrice > Number(price.value)) return false;
      // Jeżeli klient nie zaznaczy żadnego konkretnego typu w filtrze -> wyświeltamy wszstkie typy bez filtrowania (filtrujemy tylko po cenie wynajmu)
      if (type.value.length !== 0 && !type.value.includes(car.bodyType.toLowerCase())) return false;
      return true;
    })
  });
</script>

<template>
  <section class="grid grid-cols-[22rem_1fr]">
    <div>
      <CarPriceFilter v-model:price="price" v-model:type="type" />
    </div>
    <div>
      <CarsCollection :cars="fiteredCars" />
    </div>
  </section>
</template>