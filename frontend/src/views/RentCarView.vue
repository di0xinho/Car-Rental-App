<script setup lang="ts">
  import { ref, watch } from 'vue';
  import CarPreferencesFilterPanel from '@/components/filter-panels/CarPreferencesFilterPanel.vue';
  import DatePlaceFilterPanel from '@/components/filter-panels/DatePlaceFilterPanel.vue';
  import CarRentCard from '@/components/cars-collection/CarRentCard.vue';
  import PreferencesWizard from '@/components/preferences-wizard/PreferencesWizard.vue';
  import ListPaginator from '@/components/paginator/ListPaginator.vue';
  import useCarPreferences from '@/composables/useCarPreferences';
  import { Car } from '@/utilities/models/carModel';

  const { preferences, getCarsByPreferences } = useCarPreferences();

  const city = ref('');
  const dateFrom = ref('2025-03-01');
  const dateTo = ref('2025-04-01');

  const cars = ref<Car[]>([]);
  const page = ref(1);
  const totalPages = ref(1);

  // Car preferrences is a global state (useCarPreferences.ts) controlled from different components preserved through navigation (we want to preserve that to enhence user experience by remembering his choices)
  watch( preferences, async (newPreferences) => {
    // Every time we chnge filtering params we shoud fetch new cars starting from page 1
    page.value = 1;
    totalPages.value = 1;
    try {
      const carsData = await getCarsByPreferences({
        bodyType: newPreferences.bodyType,
        minCapacity: newPreferences.minCapacity.toString(),
        maxPrice: newPreferences.maxPrice.toString(),
        fuelType: newPreferences.fuelType,
        gearboxType: newPreferences.gearboxType,
        minYear: newPreferences.minYear.toString(),
        maxMileage: newPreferences.maxMileage.toString(),
        page: page.value.toString(),
        limit: "12"
      });
      cars.value = carsData.cars;
      totalPages.value = carsData.numOfPages;
    } catch (error) {
      console.error(error);
    }
  }, { immediate: true });

  async function handleChangePage (event: number) {
    page.value = event;
    try {
      const carsData = await getCarsByPreferences({
        bodyType: preferences.bodyType,
        minCapacity: preferences.minCapacity.toString(),
        maxPrice: preferences.maxPrice.toString(),
        fuelType: preferences.fuelType,
        gearboxType: preferences.gearboxType,
        minYear: preferences.minYear.toString(),
        maxMileage: preferences.maxMileage.toString(),
        page: page.value.toString(),
        limit: "12"
      });
      cars.value = carsData.cars;
      console.log(`requested page = ${page.value} , `, `fetched page: ${carsData.currentPage}`);
      if (totalPages.value !== carsData.numOfPages) totalPages.value = carsData.numOfPages;
    } catch (error) {
      console.error(error);
    }
  }

</script>

<template>
  <div class="h-full">
    <div class="bg-light-secondary-bg p-16">
      <PreferencesWizard :open-on-start="true"/>
    </div>
    <section class="h-full grid grid-cols-[20rem_1fr] grid-rows-[auto_1fr] my-15">
      <div class="col-start-1 row-span-full bg-card-bg text-dark-txt p-8">
        <CarPreferencesFilterPanel />
      </div>
      <div class="col-start-2 justify-self-start ml-8 bg-card-bg text-dark-txt">
        <DatePlaceFilterPanel v-model:city="city" v-model:date-from="dateFrom" v-model:date-to="dateTo" />
      </div>
      <div class="m-8">
        <ul class="grid grid-cols-[repeat(auto-fill,_minmax(20rem,_1fr))] gap-8">
          <li v-for="(car, index) in cars" :key="index">
            <CarRentCard :car="car" card-bg="card-bg" :time-slot="{from: dateFrom, to: dateTo}" :city="city"/>
          </li>
        </ul>
      </div>
      <div class="col-span-full mt-16">
        <ListPaginator :active-page="page" :total-pages="totalPages" @change-page="handleChangePage"/>
      </div>
    </section>
  </div>
</template>