<script setup lang="ts">
  import type { Rent } from '@/utilities/models/bookingModel';
  import { type PropType, computed } from 'vue';
  
  const { rent } = defineProps({
    rent: {type: Object as PropType<Rent>, required: true}
  });

  const rentFrom = computed(() => {
    if (rent.from) {
      const from = rent.from.split('T');
      return {day: from[0] , hour: from[1].slice(0, 5) };
    }
  });

  const rentTo = computed(() => {
    if (rent.to) {
      const to = rent.to.split('T');
      return {day: to[0] , hour: to[1].slice(0, 5)};
    }
  });

  const distance = computed(() => {
    if (rent.carMileageAtEnd && rent.carMileageAtStart) {
      return rent.carMileageAtEnd - rent.carMileageAtStart;
    }
  });
</script>

<template>
  <table class="table-fixed w-full border-separate border-spacing-x-0 border-spacing-y-2">
    <!-- Time slots -->
    <tr class="text-left text-sm text-neutral-600">
      <th id="booking-from" class="font-normal px-4 pt-1">Data rozpoczęcia</th>
      <th id="booking-to" class="font-normal px-4 pt-1">Data zakończenia</th>
    </tr>
    <tr class="bg-light-tertiary">
      <td headers="booking-from" class="px-4 py-2 rounded-l-lg">
        <div v-if="rentFrom">
          <div class="font-medium">{{ rentFrom.day }}</div>
          <div class="text-neutral-500">godz. {{ rentFrom.hour }}</div>
        </div>
        <span v-else class="mx-6"> - - - </span>
      </td>
      <td headers="booking-to" class="px-4 py-2 rounded-r-lg">
        <div v-if="rentTo">
          <div class="font-medium">{{ rentTo.day }}</div>
          <div class="text-neutral-500">godz. {{ rentTo.hour }}</div>
        </div>
        <span v-else class="mx-6"> - - - </span>
      </td>
    </tr>
     <!-- Distance -->
    <tr class="text-left text-sm text-neutral-600">
      <th id="booking-driver" colspan="2" class="font-normal px-4 pt-3">
        Przejechany dystans
      </th>
    </tr>
    <tr class="bg-light-tertiary">
      <td colspan="2" class="px-4 py-2 rounded-lg font-medium">
        <span v-if="distance">{{ distance }} KM</span>
        <span v-else class="mx-6"> - - - </span>
      </td>
    </tr>
  </table>
</template>