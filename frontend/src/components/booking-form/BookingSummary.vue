<script setup lang="ts">
  import type { PropType } from 'vue';
  import { Car } from '@/utilities/models/carModel';

  defineProps({
    car: {type: Object as PropType<Car>, required: true},
    from: {type: String, required: true},
    to: {type: String, required: true},
    driver: {type: Boolean, required: true},
    city: {type: String, required: true},
    totalHours: {type: Number, required: true},
    totalPrice: {type: Number, required: true}
  });
</script>

<template>
  <div class="w-full">
    <h3 class="text-xl font-semibold">Podsumowanie zamówienia</h3>
    <div class="flex items-center gap-6 my-8">
      <img :src="car.imageUrl" alt="Selected car model" class="w-2/5 bg-dominant-primary rounded-lg">
      <h4 class="text-3xl font-semibold">{{ car.make + ' ' + car.model }}</h4>
    </div>
    <hr class="my-8 border-neutral-500">
    <table class="w-full">
      <tbody>
        <tr>
          <th scope="row" class="text-left py-3 font-normal text-neutral-500">
            Cena za godzinę
          </th>
          <td class="text-right py-3 font-medium">
            {{ car.hourlyPrice }} PLN
          </td>
        </tr>
        <tr>
          <th scope="row" class="text-left py-3 font-normal text-neutral-500">
            Data
          </th>
          <td class="text-right py-3 font-medium">
            od {{ from }} do {{ to }}
          </td>
        </tr>
        <tr>
          <th scope="row" class="text-left py-3 font-normal text-neutral-500">
            Ilość godzin
          </th>
          <td class="text-right py-3 font-medium">
            {{ totalHours }}
          </td>
        </tr>
        <tr>
          <th scope="row" class="text-left py-3 font-normal text-neutral-500">
            Samochód z kierowcą
          </th>
          <td class="text-right py-3 font-medium">
            {{ driver ? 'Tak' : 'Nie' }}
          </td>
        </tr>
        <tr>
          <th scope="row" class="text-left py-3 font-normal text-neutral-500">
            Miasto
          </th>
          <td class="text-right py-3 font-medium">
            {{ city }}
          </td>
        </tr>
        <tr>
          <th scope="row" class="text-left pt-8 pb-3 text-xl font-semibold">
            Cena całkowita
          </th>
          <td class="text-right pt-8 pb-3 text-3xl font-semibold">
            {{ totalPrice }} PLN
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>