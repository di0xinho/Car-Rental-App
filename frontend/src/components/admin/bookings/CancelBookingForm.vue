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
      console.log("status: ", status.value);
      const result = await setBookingStatus(bookingId, status.value);
      console.log(result.message);
      emit('updateBooking', result.data);
    } catch (error) {
      console.error(error);
    }
  }
</script>

<template>
  <div>
    <h3>ID rezerwacji: {{ bookingId }}</h3>
    <form id="cancel-booking-form" @submit.prevent="handleSetBookingStatus">
      <fieldset class="my-8">
        <legend class="block text-sm text-neutral-600 my-8">ANULUJ REZERWACJĘ <span>(wybierz opcję z listy)</span></legend>
        <div class="my-4">
          <input id="canceled" value="canceled" type="radio" required v-model="status">
          <label for="canceled" class="ml-3">
            Rezerwacja anulowana przez użytkownika
          </label>
        </div>
        <div class="my-4">
          <input id="missing" value="missing" type="radio" required v-model="status">
          <label for="missing" class="ml-3">
            Użytkownik nie wynajął samochodu <span>(rezerwacja nie została anulowana)</span>
          </label>
        </div>
      </fieldset>
    </form>
    <div class="flex gap-8">
      <button type="button" @click="$emit('close')">Anuluj</button>
      <button type="submit" form="cancel-booking-form">
        Zmień status rezerwacji
      </button>
    </div>
  </div>
</template>