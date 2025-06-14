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
  <div>
    <h3>ID rezerwacji: {{ bookingId }}</h3>
    <form id="end-rent-form" @submit.prevent="handleEndRent">
      <div>
        <label for="rent-start-date" class="block text-sm text-neutral-600 my-8">
          DATA ROZPOCZĘCIA WYNAJMU
        </label>
        <input id="rent-start-date" type="datetime-local" required v-model="dateTo" class="block w-full px-4 py-2 my-8 outline-none bg-light-bg">
      </div>
      <div>
        <label for="mileage" class="block text-sm text-neutral-600 my-4">PRZEBIEG (KM)</label>
        <input type="number" id="mileage" v-model="mileage" :min="carMileage" max="500000" placeholder="--Podaj przebieg samochodu--" required class="w-full px-4 py-2 outline-none bg-light-bg">
      </div>
    </form>
    <div class="flex gap-8">
      <button type="button" @click="$emit('close')">Anuluj</button>
      <button type="submit" form="end-rent-form">
        Zakończ wynajem
      </button>
    </div>
  </div>
</template>