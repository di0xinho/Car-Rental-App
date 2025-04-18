<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import CarsCollection from '@/components/cars-collection/CarsCollection.vue';
  import CompanyValues from '@/components/company-values/CompanyValues.vue';
  import { Car } from '@/utilities/models/carModel';

  // Mocking recommended cars data:
  import json from '../../../mock_data/db.json';
  const recommendedCars = json['get-all-cars'].data.slice(0, 6) as Car[];
</script>

<template>
  <section class="mx-18 my-15">
    <CompanyValues />
  </section>
  <section id="cars" class="mx-18 my-15">
    <CarsCollection :cars="recommendedCars"/>
    <RouterLink :to="{name: 'cars-collection'}" class="block w-max mx-auto mt-8 btn text-light-txt">
      Zobacz wszytkie samochody
    </RouterLink>
  </section>
  <section class="mx-18 my-15">
    <h3 class="text-5xl text-center my-10">Opinie naszych klientów</h3>
    <CustomerOpinions />
  </section>
</template>