<script setup lang="ts">
  import { Booking } from '@/utilities/models/bookingModel';
  import { ref } from 'vue';
  import { dateToNormalizedString } from '@/utilities/convertDateFormat';
  import { endRent } from '@/utilities/bookingUtils';

  const { bookingId, carMileage } = defineProps({
    bookingId: {type: String, required: true},
    carMileage: {type: Number, required: true},
  });

  const emit = defineEmits<{
    close: []
    updateBooking: [booking: Booking]
  }>();
  const currentDate = dateToNormalizedString(new Date(), "T");

  const dateTo = ref<string>(currentDate);
  const mileage = ref<number>();

  async function handleEndRent() {
    try {
      if (dateTo.value && mileage.value) {
        const result = await endRent(bookingId, dateTo.value.replace('T', ' '), mileage.value);
        console.log(result.message);
        emit('updateBooking', result.data);
      } else {
        throw new Error('Uzupełnij dane dotyczące zakończenia wynajmu');
      }
    } catch (error) {
      console.error(error);
    }
  }
</script>

<template>
  <div class="p-4 sm:p-8 border rounded-lg border-gray-300">
    <h3 class="text-neutral-600">ID rezerwacji: {{ bookingId }}</h3>
    <form id="end-rent-form" @submit.prevent="handleEndRent" class="my-12">
      <div>
        <label for="rent-end-date" class="block text-sm text-neutral-600 my-4">
          DATA ZAKOŃCZENIA WYNAJMU
        </label>
        <input id="rent-end-date" type="datetime-local" required v-model="dateTo" class="block w-full px-4 py-2 my-4 outline-none bg-light-bg">
      </div>
      <div>
        <label for="mileage" class="block text-sm text-neutral-600 my-4">PRZEBIEG (KM)</label>
        <input type="number" id="mileage" v-model="mileage" :min="carMileage" max="500000" placeholder="--Podaj przebieg samochodu--" required class="block w-full px-4 py-2 my-4 outline-none bg-light-bg">
      </div>
    </form>
    <div class="flex gap-8 justify-end">
      <button type="button" @click="$emit('close')" class="px-4 py-1 border rounded-full">
        Anuluj
      </button>
      <button type="submit" form="end-rent-form" class="btn-secondary">
        Zakończ wynajem
      </button>
    </div>
  </div>
</template>