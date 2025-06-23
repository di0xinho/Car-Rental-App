<script setup lang="ts">
  import { Booking, type BookingStatus} from '@/utilities/models/bookingModel';
  import { ref } from 'vue';
  import { setBookingStatus } from '@/utilities/bookingUtils';

  const { bookingId } = defineProps({
    bookingId: {type: String, required: true}
  });

  const emit = defineEmits<{
    close: []
    updateBooking: [booking: Booking]
  }>();

  const status = ref<BookingStatus>('canceled');

  async function handleSetBookingStatus() {
    try {
      const result = await setBookingStatus(bookingId, status.value);
      emit('updateBooking', result.data);
    } catch (error) {
      console.error(error);
    }
  }
</script>

<template>
  <div class="p-4 sm:p-8 border rounded-lg border-gray-300">
    <h3 class="text-neutral-600">ID rezerwacji: {{ bookingId }}</h3>
    <form id="cancel-booking-form" @submit.prevent="handleSetBookingStatus" class="my-12">
      <fieldset>
        <legend class="block text-sm text-neutral-600">
          ANULUJ REZERWACJĘ <span>(wybierz opcję z listy)</span>
        </legend>
        <div class="my-4 mx-4">
          <input id="canceled" value="canceled" type="radio" required v-model="status">
          <label for="canceled" class="ml-3">
            Rezerwacja anulowana przez użytkownika
          </label>
        </div>
        <div class="my-4 mx-4">
          <input id="missing" value="missing" type="radio" required v-model="status">
          <label for="missing" class="ml-3">
            Zakończenie okresu rezerwacji <sup>*</sup>
          </label>
        </div>
      </fieldset>
      <p class="text-sm text-neutral-600">
        <sup>*</sup>
        <span class="ml-2">
          Termin rezerwacji upłynął. Użytkownik nie wynajął samochodu i nie anulował rezerwacji.
        </span>
      </p>
    </form>
    <div class="flex gap-8 justify-end">
      <button type="button" @click="$emit('close')" class="px-4 py-1 border rounded-full">
        Anuluj
      </button>
      <button type="submit" form="cancel-booking-form" class="btn-secondary">
        Anuluj rezerwację
      </button>
    </div>
  </div>
</template>