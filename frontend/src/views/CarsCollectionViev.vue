<script setup lang="ts">
  import CarsCollection from '@/components/cars-collection/CarsCollection.vue';
  import BodyTypeFilter from '@/components/filter-panels/filters/BodyTypeFilter.vue';
  import PriceFilter from '@/components/filter-panels/filters/PriceFilter.vue';
  import { Car } from '@/utilities/models/carModel';
  import { ref, computed } from 'vue';

  const type = ref<string[]>([]);
  const price = ref('400');

  // Mocking cars data:
  import json from '../../../mock_data/db.json';
  const cars = json['get-all-cars'].data as Car[];

  const fiteredCars = computed(() => {
    return cars.filter(car => {
      if (car.price > Number(price.value)) return false;
      // Jeżeli klient nie zaznaczy żadnego konkretnego typu w filtrze -> wyświeltamy wszstkie typy bez filtrowania (filtrujemy tylko po cenie wynajmu)
      if (type.value.length !== 0 && !type.value.includes(car.bodyType.toLowerCase())) return false;
      return true;
    })
  });
</script>

<template>
  <section class="grid grid-cols-[20rem_1fr] my-15">
    <div class="bg-card-bg p-8 text-dark-txt">
      <BodyTypeFilter v-model:type="type" />
      <PriceFilter v-model:price="price" />
    </div>
    <div class="mx-8">
      <CarsCollection :cars="fiteredCars" />
    </div>
  </section>
</template>