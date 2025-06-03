<script setup lang="ts">
  import { Car } from '@/utilities/models/carModel';
  import { ref, onMounted } from 'vue';
  import CarsTable from '@/components/admin/CarsTable.vue';
  import CarMakerSelect from '@/components/filter-panels/filters/CarMakerSelect.vue';
  import PriceFilter from '@/components/filter-panels/filters/PriceFilter.vue';
  import FuelTypeSelect from '@/components/filter-panels/filters/FuelTypeSelect.vue';

  const cars = ref<Car[]>([]);
  const page = ref(1);
  const totalPages = ref(1);

  // filters refs
  const maker = ref<string[]>([]);
  const fuel = ref<string[]>([]);
  const maxPrice = ref<string>('120');

  function filterCars() {
    console.log(maker.value);
    console.log(fuel.value);
    console.log(maxPrice.value);
  }
</script>

<template>
  <h1 class="text-xl xs:text-2xl px-6 lg:px-16 py-8">Samochody</h1>
  <!-- Car Filters -->
  <div class="px-8 py-4">
    <form class="flex gap-8" @submit.prevent="filterCars">
      <div class="w-3xs grow">
        <CarMakerSelect v-model:maker="maker" />
      </div>
      <div class="w-3xs grow">
        <FuelTypeSelect v-model:fuel="fuel" />
      </div>
      <div class="w-3xs grow">
        <PriceFilter v-model:price="maxPrice" />
      </div>
      <button type="submit" class="btn">Filtruj</button>
    </form>
  </div>
</template>