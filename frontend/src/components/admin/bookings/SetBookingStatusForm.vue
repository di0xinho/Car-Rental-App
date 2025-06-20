<script setup lang="ts">
  import { Booking, type BookingStatus} from '@/utilities/models/bookingModel';
  import { ref, type PropType } from 'vue';
  import { setBookingStatus } from '@/utilities/bookingUtils';

  const { bookingId, bookingStatus } = defineProps({
    bookingId: {type: String, required: true},
    bookingStatus: {type: String as PropType<BookingStatus>, required: true}  
  });

  const emit = defineEmits<{
    close: []
    updateBooking: [booking: Booking]
  }>();

  const status = ref<BookingStatus>(bookingStatus);

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
  <div class="p-4 sm:p-8 border rounded-lg border-gray-300">
    <h3 class="text-neutral-600">ID rezerwacji: {{ bookingId }}</h3>
    <form id="cancel-booking-form" @submit.prevent="handleSetBookingStatus" class="my-12">
      <fieldset>
        <legend class="block text-sm text-neutral-600">
          ZMIEŃ STATUS REZERWACJI <span class="inline-block">(wybierz opcję z listy)</span>
        </legend>
        <!-- canceled -->
        <div class="my-4 mx-4">
          <input id="canceled" value="canceled" type="radio" required v-model="status">
          <label for="canceled" class="ml-3">
            Rezerwacja anulowana przez użytkownika
          </label>
        </div>
        <!-- missing -->
        <div class="my-4 mx-4">
          <input id="missing" value="missing" type="radio" required v-model="status">
          <label for="missing" class="ml-3">
            Brak wynajmu (rezerwacja nie została anulowana)
          </label>
        </div>
        <!-- awaiting -->
        <div class="my-4 mx-4">
          <input id="awaiting" value="awaiting" type="radio" required v-model="status">
          <label for="awaiting" class="ml-3">
            Rezerwacja (oczekuje na wynajem)
          </label>
        </div>
        <!-- active -->
        <div class="my-4 mx-4">
          <input id="active" value="active" type="radio" required v-model="status">
          <label for="active" class="ml-3">
            Wynajem (trwający wynajem samochodu)
          </label>
        </div>
        <!-- complete -->
        <div class="my-4 mx-4">
          <input id="complete" value="complete" type="radio" required v-model="status">
          <label for="complete" class="ml-3">
            Zakończona (zakończony wynajem samochodu)
          </label>
        </div>
      </fieldset>
    </form>
    <div class="flex gap-8 justify-end">
      <button type="button" @click="$emit('close')" class="px-4 py-1 border rounded-full">
        Anuluj
      </button>
      <button type="submit" form="cancel-booking-form" class="btn-secondary">
        Zmień status rezerwacji
      </button>
    </div>
  </div>
</template>