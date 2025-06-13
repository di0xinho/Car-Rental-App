<script setup lang="ts">
  import { computed, type PropType } from 'vue';
  import { Car } from '@/utilities/models/carModel';

  const props = defineProps({
    car: {type: Object as PropType<Car>, required: true},
    from: {type: String, required: true},
    to: {type: String, required: true},
    driver: {type: Boolean, required: true},
    totalHours: {type: Number, required: true},
    totalPrice: {type: Number, required: true}
  });

  const bookingFrom = computed(() => {
    const [day, hour] = props.from.split('T');
    return {day: day, hour: hour};
  });

  const bookingTo = computed(() => {
    const [day, hour] = props.to.split('T');
    return {day: day, hour: hour};
  });
</script>

<template>
  <div class="w-full">
    <h3 class="text-xl font-semibold">Podsumowanie zamówienia</h3>
    <div class="flex items-center gap-4 my-8">
      <img :src="car.imageUrl" alt="Selected car model" class="w-3/5 bg-dominant-primary rounded-lg">
      <h4 class="p-2 mx-auto text-2xl font-semibold">{{ car.make + ' ' + car.model }}</h4>
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
          <th scope="row" class="text-left align-top py-3 font-normal text-neutral-500">
            Data rozpoczęcia
          </th>
          <td class="text-right py-3">
            <span class="font-medium inline-block">{{ bookingFrom.day }}</span>
            <span class="inline-block ml-3">godz. {{ bookingFrom.hour }}</span>
          </td>
        </tr>
        <tr>
          <th scope="row" class="text-left align-top py-3 font-normal text-neutral-500">
            Data zakończenia
          </th>
          <td class="text-right py-3">
            <span class="font-medium inline-block">{{ bookingTo.day }}</span>
            <span class="inline-block ml-3">godz. {{ bookingTo.hour }}</span>
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
          <th scope="row" class="text-left pt-8 pb-3 text-xl font-semibold">
            Cena całkowita
          </th>
          <td class="text-right pt-8 pb-3 text-2xl font-semibold">
            {{ totalPrice }} PLN
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>