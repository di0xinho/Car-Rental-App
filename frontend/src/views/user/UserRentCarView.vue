<script setup lang="ts">
  import { ref, watch } from 'vue';
  import CarPreferencesFilterPanel from '@/components/filter-panels/CarPreferencesFilterPanel.vue';
  import DatePlaceFilterPanel from '@/components/filter-panels/DatePlaceFilterPanel.vue';
  import CarRentCard from '@/components/cars-collection/CarRentCard.vue';
  import ListPaginator from '@/components/paginator/ListPaginator.vue';
  import useCarPreferences from '@/composables/useCarPreferences';
  import { Car } from '@/utilities/models/carModel';
  import { getCarsByPreferences } from '@/utilities/carUtils';

  const { preferences } = useCarPreferences();

  const city = ref('');
  const dateFrom = ref('2025-03-01');
  const dateTo = ref('2025-04-01');

  const cars = ref<Car[]>([]);
  const page = ref(1);
  const totalPages = ref(1);

  watch( preferences, async (newPreferences) => {
    // Every time we chnge filtering params we shoud fetch new cars starting from page 1
    page.value = 1;
    totalPages.value = 1;
    try {
      const carsData = await getCarsByPreferences(newPreferences, page.value, 12);
      cars.value = carsData.cars;
      totalPages.value = carsData.numOfPages;
    } catch (error) {
      console.error(error);
    }
  }, { immediate: true });

  async function handleChangePage (event: number) {
    page.value = event;
    try {
      const carsData = await getCarsByPreferences(preferences, page.value, 12);
      cars.value = carsData.cars;
      console.log(`requested page = ${page.value} , `, `fetched page: ${carsData.currentPage}`);
      if (totalPages.value !== carsData.numOfPages) totalPages.value = carsData.numOfPages;
    } catch (error) {
      console.error(error);
    }
  }
</script>

<template>
  <section class="min-h-full grid grid-cols-[20rem_1fr] grid-rows-[auto_1fr]">
    <div class=" col-start-1 row-span-2 bg-light-bg dark:bg-dark-bg text-dark-txt dark:text-light-txt p-8">
      <CarPreferencesFilterPanel />
    </div>
    <div class="col-start-2 justify-self-start ml-8 bg-light-bg text-dark-txt">
      <DatePlaceFilterPanel v-model:city="city" v-model:date-from="dateFrom" v-model:date-to="dateTo" />
    </div>
    <div class="m-8">
      <ul class="grid grid-cols-[repeat(auto-fill,_minmax(20rem,_1fr))] gap-8">
        <li v-for="(car, index) in cars" :key="index">
          <CarRentCard :car="car" card-bg="light-bg" :time-slot="{from: dateFrom, to: dateTo}" :city="city"/>
        </li>
      </ul>
    </div>
    <div class="mt-2 col-span-2 bg-light-bg dark:bg-dark-bg text-dark-txt dark:text-light-txt p-8">
      <ListPaginator :active-page="page" :total-pages="totalPages" @change-page="handleChangePage"/>
    </div>
  </section>
</template>