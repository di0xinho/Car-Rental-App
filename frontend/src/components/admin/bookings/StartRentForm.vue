<script setup lang="ts">
  import { Booking } from '@/utilities/models/bookingModel';
  import { ref } from 'vue';
  import { dateToNormalizedString } from '@/utilities/convertDateFormat';
  import { startRent } from '@/utilities/bookingUtils';

  const { bookingId } = defineProps({
    bookingId: {type: String, required: true}
  });

  const emit = defineEmits<{
    close: []
    rent: [booking: Booking]
  }>();
  const currentDate = dateToNormalizedString(new Date(), "T");

  const dateFrom = ref<string>(currentDate);

  async function handleStartRent() {
    try {
      console.log("dateFrom: ", dateFrom.value.replace('T', ' '));
      const result = await startRent(bookingId, dateFrom.value.replace('T', ' '));
      console.log(result.message);
      emit('rent', result.data);
    } catch (error) {
      console.error(error);
    }
  }
</script>

<template>
  <h3>ID rezerwacji: {{ bookingId }}</h3>
  <form id="start-rent-form" @submit.prevent="handleStartRent">
    <label for="rent-start-date" class="block text-sm text-neutral-600 my-8">
      DATA ROZPOCZĘCIA WYNAJMU
    </label>
    <input id="rent-start-date" type="datetime-local" required v-model="dateFrom" class="block w-full px-4 py-2 my-8 outline-none bg-light-bg">
  </form>
  <div class="flex gap-8">
    <button type="button" @click="$emit('close')">Anuluj</button>
    <button type="submit" form="start-rent-form">
      Rozpocznij wynajem
    </button>
  </div>
</template>