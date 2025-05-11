<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { onMounted, ref } from 'vue';
  import CarsCollection from '@/components/cars-collection/CarsCollection.vue';
  import CompanyValues from '@/components/company-values/CompanyValues.vue';
  import CustomerOpinions from '@/components/customers_opinions/CustomerOpinions.vue';
  import { Car } from '@/utilities/models/carModel';
  import { getRecommendedCars } from '@/utilities/carUtils';
  import useCarPreferences from '@/composables/useCarPreferences';

  const { recommendedCarsCluster } = useCarPreferences();

  const recommendedCars = ref<Car[]|null>(null);

  onMounted(async() => {
    try {
      const result = await getRecommendedCars(recommendedCarsCluster.value);
      // Displaying only first six cars from array
      recommendedCars.value = result.data.slice(0, 6);
    } catch (error) {
      console.error(error);
    }
  });
</script>

<template>
  <section class="section">
    <CompanyValues />
  </section>
  <section id="cars" class="section my-12 sm:my-20">
    <div v-if="recommendedCars">
      <CarsCollection :cars="recommendedCars"/>
      <RouterLink :to="{name: 'cars-collection'}" class="block w-max mx-auto mt-8 btn text-light-txt">
        Zobacz wszytkie samochody
      </RouterLink>
    </div>
    <div v-else>Loading...</div>
  </section>
  <!-- Opinion section has a little bigger left and right margin in mobile view to adjust it to resolution 360px width (20px + card 320px + 20px = mobile 360px) -->
  <section class="mx-5 sm:mx-8 lg:mx-16">
    <h3 class="text-2xl sm:text-4xl lg:text-5xl text-center my-10">
      Opinie naszych klientów
    </h3>
    <CustomerOpinions />
  </section>
</template>