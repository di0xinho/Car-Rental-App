<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import { useRoute, useRouter, RouterLink } from 'vue-router';
  import { getCarById } from '@/utilities/carUtils';
  import { Car } from '@/utilities/models/carModel';

  const car = ref<Car|null>(null);

  const route = useRoute();
  const router = useRouter();

  const from = computed(() => {
    const fromDate = (route.query.from as string|undefined)?.split('T');
    if (fromDate) return {day: fromDate[0], hour: fromDate[1]};
  });

  const to = computed(() => {
    const toDate = (route.query.to as string|undefined)?.split('T');
    if (toDate) return {day: toDate[0], hour: toDate[1]};
  });

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
   <section class="max-w-3xl mx-auto p-4 sm:p-8">
    <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold text-center">
      Rezerwacja zakończona sukcesem !
    </h2>
    <div v-if="car">
      <div class="flex items-center justify-between my-12 xs:my-16 bg-light-secondary-bg rounded-3xl overflow-hidden shadow-lg">
        <img :src="car.imageUrl" :alt="car.make + ' ' + car.model" class="w-3/5 min-h-40 object-cover">
        <h3 class="text-2xl sm:text-3xl md:text-4xl font-semibold p-4 mx-auto">
          {{ car.make + ' ' + car.model }}
        </h3>
      </div>
      <dl class="w-full">
        <dt class="font-medium mt-8 md:mt-12 text-lg sm:text-xl md:text-2xl text-neutral-600">
          Termin wypożyczenia samochodu
        </dt>
        <dd class="flex justify-between gap-8 m-4 sm:m-6 text-base sm:text-lg md:text-xl">
          <div class="text-right">
            <span class="block sm:inline-block">od <span class="font-medium">{{ from?.day }}</span></span>
            <span class="inline-block ml-3">godz. {{ from?.hour }}</span>
          </div>
          <div class="text-right">
            <span class="block sm:inline-block">do <span class="font-medium">{{ to?.day }}</span></span>
            <span class="inline-block ml-3">godz. {{ to?.hour }}</span>
          </div>
        </dd>
        <dt class="font-medium mt-8 md:mt-12 text-lg sm:text-xl md:text-2xl text-neutral-600">
          Płatność
        </dt>
        <dd v-if="$route.query.payment === 'stripe'" class="m-4 sm:m-6 text-base sm:text-lg md:text-xl">
          Rezerwacja opłacona
          <span class="inline-block">
            (zapłacono <span class="font-medium">{{ $route.query.total_price }} ZŁ</span>)
          </span> 
        </dd>
        <dd v-else class="m-4 sm:m-6 text-base sm:text-lg md:text-xl">
          Rezerwację opłać na miejscu
          <span class="inline-block">
            (kwota do zapłaty <span class="font-medium">{{ $route.query.total_price }} ZŁ)</span>
          </span>
        </dd>
      </dl>
      <p class="text-end mt-12 sm:mt-16 md:mt-24 text-base sm:text-lg md:text-xl">
        Swoje rezerwacje możesz sprawdzić
        <RouterLink :to="{name: 'user-bookings'}" class="text-sky-800">
          tutaj
          <span class="sm:mx-2 text-lg sm:text-xl md:text-2xl">&#10230;</span>
        </RouterLink>
      </p>
    </div>
   </section>
</template>