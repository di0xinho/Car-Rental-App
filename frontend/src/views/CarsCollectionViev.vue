<script setup lang="ts">
  import CarsCollection from '@/components/cars-collection/CarsCollection.vue';
  import BodyTypeFilter from '@/components/filter-panels/filters/BodyTypeFilter.vue';
  import PriceFilter from '@/components/filter-panels/filters/PriceFilter.vue';
  import FuelTypeFilter from '@/components/filter-panels/filters/FuelTypeFilter.vue';
  import PreferencesWizard from '@/components/preferences-wizard/PreferencesWizard.vue';
  import RecommendedCars from '@/components/cars-collection/RecommendedCars.vue';
  import ListPaginator from '@/components/paginator/ListPaginator.vue';
  import { Car } from '@/utilities/models/carModel';
  import { ref, computed, watch } from 'vue';
  import useCarPreferences from '@/composables/useCarPreferences';

  const { preferences, setCarPreferences, getCarsByPreferences } = useCarPreferences();

  const bodyType = ref<string[]>(preferences.bodyType);
  const maxPrice = ref(preferences.maxPrice.toString());
  const fuelType = ref(preferences.fuelType);

  const cars = ref<Car[]>([]);
  const page = ref(1);
  const totalPages = ref(1);

  // Car preferrences is a global state (useCarPreferences.ts) controlled from different components preserved through navigation (we want to preserve that to enhence user experience by remembering his choices)
  watch( [()=>preferences.bodyType, ()=>preferences.maxPrice, ()=>preferences.fuelType], async ([newBodyType, newMaxPrice, newFuelType]) => {
    bodyType.value = newBodyType;
    maxPrice.value = newMaxPrice.toString();
    fuelType.value = newFuelType;
    // Every time we chnge filtering params we shoud fetch new cars starting from page 1
    page.value = 1;
    totalPages.value = 1;
    try {
      const carsData = await getCarsByPreferences({
        bodyType: bodyType.value,
        maxPrice: maxPrice.value,
        fuelType: fuelType.value,
        page: page.value.toString(),
        limit: "12"
      });
      cars.value = carsData.cars;
      totalPages.value = carsData.numOfPages;
    } catch (error) {
      console.error(error);
    }
  }, { immediate: true });

  function handleFilterCars () {
    setCarPreferences({
      bodyType: bodyType.value,
      maxPrice: parseInt(maxPrice.value),
      fuelType: fuelType.value
    });
  }

  async function handleChangePage (event: number) {
    page.value = event;
    try {
      const carsData = await getCarsByPreferences({
        bodyType: bodyType.value,
        maxPrice: maxPrice.value,
        fuelType: fuelType.value,
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
    <section class="bg-light-secondary-bg py-16">
      <h2 class="text-5xl text-neutral-500 mx-16">
        Rekomendowane dla Ciebie
      </h2>
      <div class="mx-4 my-16">
        <RecommendedCars :cars="cars"/>
      </div>
      <div class="mx-16">
        <PreferencesWizard :open-on-start="false"/>
      </div>
    </section>
    <section class="grid grid-cols-[20rem_1fr] my-15">
      <div class="bg-card-bg p-8 text-dark-txt">
        <form @submit.prevent="handleFilterCars" class="flex flex-col gap-2">
          <div>
            <BodyTypeFilter v-model:type="bodyType" />
          </div>
          <div>
            <PriceFilter v-model:price="maxPrice" />
          </div>
          <div>
            <FuelTypeFilter :fuel="fuelType"/>
          </div>
          <button type="submit" class="btn">
            Sprawdź dostępne modele
          </button>
        </form>
      </div>
      <div class="mx-8">
        <CarsCollection :cars="cars" />
      </div>
      <div class="col-span-full mt-16">
        <ListPaginator :active-page="page" :total-pages="totalPages" @change-page="handleChangePage"/>
      </div>
    </section>
  </div>
</template>