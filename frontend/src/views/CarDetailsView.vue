<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { Car } from '@/utilities/models/carModel';
  import { getCarById } from '@/utilities/carUtils';
  import { useRoute, useRouter } from 'vue-router';
  import CarSpecification from '@/components/cars-collection/CarSpecification.vue';

  const route = useRoute();
  const router = useRouter();

  const car = ref<Car>();

  onMounted(async() => {
    try {
      const carID = route.params.id as string
      const result = await getCarById(carID);
      car.value = result.data;
    } catch (error) {
      console.error(error)
    }
  })
</script>

<template>
  <section class="section">
    <div v-if="car">
      <h1 class="text-3xl text-medium my-10">{{ car.make + " " + car.model }}</h1>
      <div  class="grid md:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
        <div>
          <ul class="text-neutral-500 mb-6">
            <li>
              Id: {{ car._id }}
            </li>
            <li>
              <span class="text-2xl font-semibold text-dominant-primary">
                {{ car.hourlyPrice + " ZŁ"}}
              </span>
              <span>/za godzinę</span>
            </li>
          </ul>
          <img :src="car.imageUrl" :alt="`${car.make} ${car.model}`" class="rounded-xl">
        </div>
        <div>
          <h2 class="text-2xl my-6">Specyfikacja</h2>
          <CarSpecification :car="car" />
        </div>
        <p class="col-span-full text-justify text-sm xs:text-base">{{ car.description }}</p>
      </div>
    </div>
    <div v-else>
      <h2>Wystąpił błąd! Nie znaleziono samochodu.</h2>
    </div>
  </section>
</template>
