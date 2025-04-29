<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute, useRouter, RouterLink } from 'vue-router';
  import { getCarById } from '@/utilities/carUtils';
  import { Car } from '@/utilities/models/carModel';

  const car = ref<Car|null>(null);

  const route = useRoute();
  const router = useRouter();

  onMounted(async () => {
    try {
      const result = await getCarById(route.query.car_id as string);
      car.value = result.data;
    } catch (error) {
      console.error(error);
      router.replace({name: 'not-found'});
    }
  });
</script>

<template>
   <section class="max-w-3xl mx-auto">
    <h2 class="text-4xl font-semibold mb-24 text-center">
      Rezerwacja zakończona sukcesem !
    </h2>
    <div v-if="car">
      <div class="flex items-center gap-12 my-24 bg-light-secondary-bg rounded-3xl overflow-hidden">
        <img :src="car.imageUrl" :alt="car.make + ' ' + car.model" class="w-3/5">
        <h3 class="text-4xl font-semibold">
          {{ car.make + ' ' + car.model }}
        </h3>
      </div>
      <dl class="w-full text-2xl">
        <dt class="font-semibold mt-16">Termin wypożyczenia samochodu</dt>
        <dd class="flex justify-between my-6">
          <div>od <span class="font-medium">{{ route.query.from }}</span></div>
          <div>do <span class="font-medium">{{ route.query.to }}</span></div>
        </dd>
        <dt class="font-semibold mt-16">Płatność</dt>
        <dd v-if="route.query.payment === 'stripe'" class="my-6">
          Rezerwacja opłacona (zapłacono <span class="font-medium">{{ route.query.total_price }} ZŁ</span>)
        </dd>
        <dd v-else class="my-6">
          Rezerwację opłać na miejscu (kwota do zapłaty <span class="font-medium">{{ route.query.total_price }} ZŁ</span>)
        </dd>
      </dl>
      <p class="text-end mt-24 text-xl">
        Swoje rezerwacje możesz sprawdzić
        <RouterLink :to="{name: 'user-bookings'}" class="text-sky-800">
          tutaj
          <span class="mx-2 text-2xl">&#10230;</span>
        </RouterLink>
      </p>
    </div>
   </section>
  
</template>