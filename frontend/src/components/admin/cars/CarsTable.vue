<script setup lang="ts">
  import { Car } from '@/utilities/models/carModel';
  import type { PropType } from 'vue';

  defineProps({
    cars: {type: Array as PropType<Array<Car>>, required: true},
    selectedCarIndex: {type: [Number, null]}
  });

  defineEmits<{selectCarIndex: [carIndex: number]}>();
</script>

<template>
  <table class="table-fixed w-full text-sm md:text-base text-black">
        <colgroup>
          <col class="w-22 xs:w-32"/>
          <col class="w-24 xs:w-24"/>
          <col class="w-20 xs:w-24"/>
          <col class="w-16 xs:w-16"/>
          <col class="w-12 xs:w-16 hidden md:table-column"/>
          <col class="w-16 xs:w-20 hidden md:table-column"/>
          <col class="w-12 sm:w-16 hidden md:table-column" />
        </colgroup>
        <thead class="text-left">
          <tr class="bg-gray-100">
            <th class="font-medium py-2 px-1 xs:px-2">ID</th>
            <th class="font-medium py-2 px-1 xs:px-2">Marka</th>
            <th class="font-medium py-2 px-1 xs:px-2">Model</th>
            <th class="font-medium py-2 px-1 xs:px-2">Rocznik</th>
            <th class="font-medium py-2 px-1 xs:px-2 hidden md:table-cell">Przebieg</th>
            <th class="font-medium py-2 px-1 xs:px-2 hidden md:table-cell">Rodzaj paliwa</th>
            <th class="font-medium py-2 px-2 xs:px-2 hidden md:table-cell">Cena</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(car, index) in cars" class="border-t border-gray-300 cursor-pointer" @click="$emit('selectCarIndex', index)" :class="[selectedCarIndex === index ? 'bg-dominant-secondary' : 'bg-light-bg']">
            <td class="overflow-hidden text-ellipsis py-2 px-1 xs:px-2">{{ car._id }}</td>
            <td class="py-2 px-1 xs:px-2">{{ car.make }}</td>
            <td class="py-2 px-1 xs:px-2">{{ car.model }}</td>
            <td class="py-2 px-1 xs:px-2">{{ car.year }}</td>
            <td class="py-2 px-1 xs:px-2 hidden md:table-cell">{{ car.mileage }}</td>
            <td class="py-2 px-1 xs:px-2 hidden md:table-cell">{{ car.fuelType }}</td>
            <td class="py-2 px-2 xs:px-2 hidden md:table-cell">{{ car.hourlyPrice }}</td>
          </tr>
        </tbody>
      </table>
</template>