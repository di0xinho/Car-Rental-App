<script setup lang="ts">
  import { ref, computed } from 'vue';
  import CarPriceFilter from '@/components/filter-panels/CarPriceFilter.vue';
  import DatePlaceFilter from '@/components/filter-panels/DatePlaceFilter.vue';
  import CarRentCard from '@/components/cars-collection/CarRentCard.vue';
  import { Car } from '@/utilities/carModel';

  const type = ref<string[]>([]);
  const price = ref('400');
  const city = ref('');
  const dateFrom = ref('2025-03-01');
  const dateTo = ref('2025-04-01');

  // Mocking cars data:
  import json from '../../../../mock_data/db.json';
  const cars = json['get-all-cars'].data as Car[];

  const fiteredCars = computed(() => {
    return cars.filter(car => {
      if (car.dailyPrice > Number(price.value)) return false;
      if (type.value.length !== 0 && !type.value.includes(car.bodyType.toLowerCase())) return false;
      return true;
    })
    // Jeżeli klient nie zaznaczy żadnego konkretnego typu w filtrze -> wyświeltamy wszstkie typy bez filtrowania (filtrujemy tylko po cenie wynajmu)
  });

</script>

<template>
  <section class="h-full grid grid-cols-[22rem_1fr] grid-rows-[8rem_1fr]">
    <div class="col-start-1 row-span-full bg-layout-primary">
      <CarPriceFilter v-model:type="type" v-model:price="price" />
    </div>
    <div class="col-start-2 justify-self-start">
      <DatePlaceFilter v-model:city="city" v-model:date-from="dateFrom" v-model:date-to="dateTo" />
    </div>
    <div>
      <ul class="grid grid-cols-[repeat(auto-fill,_minmax(22rem,_1fr))] p-8 gap-8">
        <li v-for="(car, index) in cars" :key="index">
          <CarRentCard :car="car" />
        </li>
      </ul>
    </div>
  </section>
</template>