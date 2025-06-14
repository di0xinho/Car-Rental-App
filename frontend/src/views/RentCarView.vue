<script setup lang="ts">
  import { ref, watch } from 'vue';
  import CarPreferencesFilterPanel from '@/components/filter-panels/CarPreferencesFilterPanel.vue';
  import DateFilterPanel from '@/components/filter-panels/DateFilterPanel.vue';
  import CarRentCard from '@/components/cars-collection/CarRentCard.vue';
  import PreferencesWizard from '@/components/preferences-wizard/PreferencesWizard.vue';
  import ListPaginator from '@/components/paginator/ListPaginator.vue';
  import useCarPreferences from '@/composables/useCarPreferences';
  import { Car } from '@/utilities/models/carModel';
  import { getCarsByPreferences } from '@/utilities/carUtils';
    import { dateToNormalizedString } from '@/utilities/convertDateFormat';

  const { preferences } = useCarPreferences();
  
  // date/time format accepted by API "YYYY-MM-DD HH:mm"
  const currentDateString = dateToNormalizedString(new Date(), "T");
  const dateFrom = ref(currentDateString);
  const dateTo = ref(currentDateString);

  const cars = ref<Car[]>([]);
  const page = ref(1);
  const totalPages = ref(1);

  const openFilterPanel = ref(false);

  // Car preferrences is a global state (useCarPreferences.ts) controlled from different components preserved through navigation (we want to preserve that to enhence user experience by remembering his choices)
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
  <div class="h-full">
    <div class="bg-light-secondary-bg py-16 px-6 sm:px-12 lg:px-16">
      <PreferencesWizard :open-on-start="true"/>
    </div>
    <section class="h-full grid grid-cols-[1rem_1fr] xs:grid-cols-[40px_1fr] md:grid-cols-[18rem_1fr] grid-rows-[auto_1fr] my-15">
      <div class="col-start-1 row-span-full relative w-full h-full">
        <div class="flex gap-2 text-dark-txt w-2xs md:h-full absolute z-20 left-0 top-0 md:static transition-transform md:translate-none" :class="{'-translate-x-62': !openFilterPanel}">
          <CarPreferencesFilterPanel class="py-8 px-6 md:px-8 bg-card-bg md:shadow-[none]" :class="{'shadow-[10px_0_20px_#00000050]': openFilterPanel}"/>
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
      <div class="col-start-2 mx-2 xs:mx-6 xl:mx-8 px-6 sm:px-8 py-8 xs:justify-self-start bg-card-bg text-dark-txt">
        <DateFilterPanel v-model:date-from="dateFrom" v-model:date-to="dateTo" />
      </div>
      <div class="mx-2 xs:mx-6 my-6 xl:m-8">
        <ul class="grid grid-cols-[repeat(auto-fill,_minmax(20rem,_max-content))] gap-6 xl:gap-8 justify-center">
          <li v-for="(car, index) in cars" :key="index" class="max-w-md">
            <CarRentCard :car="car" :time-slot="{from: dateFrom, to: dateTo}"/>
          </li>
        </ul>
      </div>
      <div class="col-span-full mt-16">
        <ListPaginator :active-page="page" :total-pages="totalPages" @change-page="handleChangePage"/>
      </div>
    </section>
  </div>
</template>