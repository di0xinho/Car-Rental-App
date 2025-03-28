<script setup lang="ts">
  import { ref, watchEffect, toRaw } from 'vue';
  import CarPreferencesFilterPanel from '@/components/filter-panels/CarPreferencesFilterPanel.vue';
  import DatePlaceFilterPanel from '@/components/filter-panels/DatePlaceFilterPanel.vue';
  import CarRentCard from '@/components/cars-collection/CarRentCard.vue';
  import PreferencesWizard from '@/components/preferences-wizard/PreferencesWizard.vue';
  import useCarPreferences from '@/composables/useCarPreferences';
  import { Car } from '@/utilities/carModel';

  const { preferences } = useCarPreferences();

  const city = ref('');
  const dateFrom = ref('2025-03-01');
  const dateTo = ref('2025-04-01');

  watchEffect(() => {
    // Fetching Cars Data every time the Car Preferences change!
    // Car Preferences can be changed in PreferencesWizar and CarPreferencesFilterPanel
    const carParams = JSON.stringify(preferences);
    console.log('Here we will fetch cars data! Car Params:');
    console.log(carParams);
  })

  // Mocking cars data:
  import json from '../../../mock_data/db.json';
  const cars = json['get-all-cars'].data as Car[];

</script>

<template>
  <div class="h-full">
    <div>
      <PreferencesWizard />
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
            <CarRentCard :car="car" card-bg="card-bg" />
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>