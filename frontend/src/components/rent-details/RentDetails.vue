<script setup lang="ts">
  import { Rent } from '@/utilities/models/rentModel';
  import { computed, type PropType } from 'vue';
  import CarDetailsCard from '@/components/cars-collection/CarDetailsCard.vue';

  const { rent } = defineProps({
    rent: {type: Object as PropType<Rent>, required: true}
  });

  const distance = computed(() => {
    if (rent.carMileage.atEnd && rent.carMileage.atStart) {
      return rent.carMileage.atEnd - rent.carMileage.atStart;
    } else {
      return 'brak danych';
    }
  });
</script>

<template>
  <div>
    <!-- Rent ID and Status -->
    <h4 class="my-2 mx-8 text-sm text-neutral-600">ID: {{ rent._id }}</h4>
    <div class="flex flex-col lg:flex-row max-w-lg lg:max-w-full gap-8 xl:gap-16 lg:items-center mx-auto">
      <!-- Car details -->
      <div class="lg:basis-xs grow max-w-lg">
        <CarDetailsCard :car="rent.car"/>
      </div>
      <!-- Rent details -->
      <div class="lg:basis-xs grow max-w-lg">
        <dl class="grid grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <dt class="text-sm text-neutral-600 mb-2">Od</dt>
            <dd class="mx-4">{{ rent.rentPeriod.start }}</dd>
          </div>
          <div>
            <dt class="text-sm text-neutral-600 mb-2">Do</dt>
            <dd class="mx-4">{{ rent.rentPeriod.end }}</dd>
          </div>
          <div>
            <dt class="text-sm text-neutral-600 mb-2">Cena</dt>
            <dd class="mx-4">{{ rent.payment }}</dd>
          </div>
          <div>
            <dt class="text-sm text-neutral-600 mb-2">Kilometraż</dt>
            <dd class="mx-4">{{ distance }}</dd>
          </div>
          <div class="col-span-2 flex items-center">
            <dt class="text-sm text-neutral-600">Status:</dt>
            <dd class="mx-4" :class="[rent.status === 'complete' ? 'text-black' : 'text-lime-700']">
              <span>{{ rent.status === 'complete'  ? "&#10004;" : "&#33;" }}</span>
              <span class="text-sm ml-3">
                {{ rent.status === 'complete' ? "zakończony" : "trwający" }}
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>