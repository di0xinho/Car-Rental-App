<script setup lang="ts">
  import { Booking } from '@/utilities/models/bookingModel';
  import { ref } from 'vue';
  import { dateToNormalizedString } from '@/utilities/convertDateFormat';
  import { startRent } from '@/utilities/bookingUtils';

  const { bookingId, bookingIsPaid } = defineProps({
    bookingId: {type: String, required: true},
    bookingIsPaid: {type: Boolean, required: true}
  });

  const emit = defineEmits<{
    close: []
    updateBooking: [booking: Booking]
  }>();

  const currentDate = dateToNormalizedString(new Date(), "T");

  const dateFrom = ref<string>(currentDate);
  const isPaid = ref<boolean>(bookingIsPaid);

  async function handleStartRent() {
    try {
      console.log("dateFrom: ", dateFrom.value.replace('T', ' '));
      const result = await startRent(bookingId, dateFrom.value.replace('T', ' '), isPaid.value);
      console.log(result.message);
      emit('updateBooking', result.data);
    } catch (error) {
      console.error(error);
    }
  }
</script>

<template>
  <div class="p-4 sm:p-8 border rounded-lg border-gray-300">
    <h3 class="text-neutral-600">ID rezerwacji: {{ bookingId }}</h3>
    <form id="start-rent-form" @submit.prevent="handleStartRent" class="my-12">
      <div>
        <label for="rent-start-date" class="block text-sm text-neutral-600 my-4">
          DATA ROZPOCZĘCIA WYNAJMU
        </label>
        <input id="rent-start-date" type="datetime-local" required v-model="dateFrom" class="block w-full px-4 py-2 my-4 outline-none bg-light-bg">
      </div>
      <fieldset>
        <legend class="block text-sm text-neutral-600 my-4">STATUS PŁATNOŚCI</legend>
        <div class="flex gap-3 px-4">
          <input type="checkbox" id="payment" v-model="isPaid"/>
          <label for="payment">Rezerwacja opłacona</label>
        </div>
      </fieldset>
    </form>
    <div class="flex gap-8 justify-end">
      <button type="button" @click="$emit('close')" class="px-4 py-1 border rounded-full">
        Anuluj
      </button>
      <button type="submit" form="start-rent-form" class="btn-secondary">
        Rozpocznij wynajem
      </button>
    </div>
  </div>
</template>