<script setup lang="ts">
  import CarsCollection from '@/components/cars-collection/CarsCollection.vue';
  import BodyTypeFilter from '@/components/filter-panels/filters/BodyTypeFilter.vue';
  import PriceFilter from '@/components/filter-panels/filters/PriceFilter.vue';
  import FuelTypeFilter from '@/components/filter-panels/filters/FuelTypeFilter.vue';
  import PreferencesWizard from '@/components/preferences-wizard/PreferencesWizard.vue';
  import RecommendedCars from '@/components/cars-collection/RecommendedCars.vue';
  import ListPaginator from '@/components/paginator/ListPaginator.vue';
  import { Car } from '@/utilities/models/carModel';
  import { ref, watch, onMounted } from 'vue';
  import useCarPreferences from '@/composables/useCarPreferences';
  import { getCarsByPreferences } from '@/utilities/carUtils';
  import { getRecommendedCars } from '@/utilities/carUtils';

  const { preferences, recommendedCarsCluster, setCarPreferences } = useCarPreferences();

  const bodyType = ref<string[]>(preferences.bodyType);
  const maxPrice = ref(preferences.maxPrice.toString());
  const fuelType = ref(preferences.fuelType);

  const recommendedCars = ref<Car[]|null>(null);

  const openFilterPanel = ref(false);

  onMounted(async() => {
    try {
      const result = await getRecommendedCars(recommendedCarsCluster.value);
      recommendedCars.value = result.data;
    } catch (error) {
      console.error(error);
    }
  });

  const cars = ref<Car[]>([]);
  const page = ref(1);
  const totalPages = ref(1);

  // Car preferrences is a global state (useCarPreferences.ts) controlled from different components preserved through navigation (we want to preserve that to enhence user experience by remembering his choices)
  watch( [()=>preferences.bodyType, ()=>preferences.maxPrice, ()=>preferences.fuelType], async ([newBodyType, newMaxPrice, newFuelType]) => {
    bodyType.value = newBodyType;
    maxPrice.value = newMaxPrice.toString();
    fuelType.value = newFuelType;
    // Every time we change filtering params we shoud fetch new cars starting from page 1
    page.value = 1;
    totalPages.value = 1;
    try {
      const carsData = await getCarsByPreferences({
        bodyType: newBodyType,
        maxPrice: newMaxPrice,
        fuelType: newFuelType
      }, page.value, 12);
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
        bodyType: preferences.bodyType,
        maxPrice: preferences.maxPrice,
        fuelType: preferences.fuelType
      }, page.value, 12);
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
      <h2 class="text-2xl sm:text-4xl lg:text-5xl text-neutral-500 mx-4 sm:mx-8 lg:mx-16">
        Rekomendowane dla Ciebie
      </h2>
        <!-- Recommended cars section has a little bigger left and right margin in mobile view to adjust it to resolution 360px width (20px + card 320px + 20px = mobile 360px) -->
      <div v-if="recommendedCars" class="mx-5 my-16">
        <RecommendedCars :cars="recommendedCars"/>
      </div>
      <div class="mx-4 sm:mx-8 lg:mx-16">
        <PreferencesWizard :open-on-start="false"/>
      </div>
    </section>
    <section class="grid grid-cols-[1rem_1fr] xs:grid-cols-[40px_1fr] md:grid-cols-[18rem_1fr] my-15">
      <div class="relative w-full h-full">
        <div class="flex gap-2 text-dark-txt w-2xs md:h-full absolute z-20 left-0 top-0 md:static transition-transform md:translate-none" :class="{'-translate-x-62': !openFilterPanel}">
          <!-- Filtering parameters panel -->
          <form @submit.prevent="handleFilterCars" class="py-8 px-6 md:px-8 flex flex-col gap-2 bg-card-bg md:shadow-[none]" :class="{'shadow-[10px_0_20px_#00000050]': openFilterPanel}">
            <div>
              <BodyTypeFilter v-model:type="bodyType" />
            </div>
            <div>
              <PriceFilter v-model:price="maxPrice" />
            </div>
            <div>
              <FuelTypeFilter v-model:fuel="fuelType" />
            </div>
            <button type="submit" class="btn">
              Sprawdź dostępne modele
            </button>
          </form>
          <!-- Open panel in mobile view button -->
          <button @click="openFilterPanel = !openFilterPanel" class="sticky top-12 my-12 self-start md:hidden px-1 py-4 rounded-full bg-neutral-600 flex flex-col gap-8 items-center">
            <div class="absolute -right-16 top-0 p-4 bg-dominant-primary rounded-full shadow-[10px_0_20px_#00000050]">
              <svg width="20" height="22" viewBox="0 0 20 22" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" :class="{'rotate-180': openFilterPanel}">
                <path d="M1 1L11 11L1 21"/>
                <path d="M9 1L19 11L9 21"/>
              </svg>
            </div>
            <span class="text-vertical text-light-txt">
              PARAMETRY
            </span>
          </button>
        </div>
      </div>
      <div class="mx-2 xs:mx-6 xl:mx-8">
        <CarsCollection :cars="cars" />
      </div>
      <div class="col-span-full mt-16">
        <ListPaginator :active-page="page" :total-pages="totalPages" @change-page="handleChangePage"/>
      </div>
    </section>
  </div>
</template>