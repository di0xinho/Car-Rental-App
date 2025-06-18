<script setup lang="ts">
  import { Booking, type BookingStatus } from '@/utilities/models/bookingModel';
  import { computed, type PropType } from 'vue';
  import CarDetailsCard from '@/components/cars-collection/CarDetailsCard.vue';
  import BookingDetailsTable from './BookingDetailsTable.vue';
  import RentDetailsTable from './RentDetailsTable.vue';

  const { booking } = defineProps({
    booking: {type: Object as PropType<Booking>, required: true}
  });

  const status = {
    awaiting: 'oczekująca',
    active: 'aktywna',
    canceled: 'anulowana',
    missing: 'brak wypożyczenia',
    complete: 'zakończona',
  }

  const showRentDetails = computed(() => {
    return (booking.status === 'complete' || booking.status === 'active') && booking.hasOwnProperty('rent');
  });
</script>

<template>
  <div>
    <!-- Booking ID and status-->
    <dl class="mt-4 mb-6 mx-8 text-neutral-600">
      <div class="flex gap-4">
        <dt>Id:</dt>
        <dd>{{ booking._id }}</dd>
      </div>
      <div class="flex gap-4">
        <dt>Status:</dt>
        <dd>{{ status[booking.status] }}</dd>
      </div>
    </dl>
    <div class="flex flex-col lg:flex-row max-w-lg lg:max-w-full gap-8 xl:gap-16 mx-auto">
      <!-- Car details -->
      <div class="lg:basis-xs grow max-w-lg">
        <CarDetailsCard :car="booking.car"/>
      </div>
      <!-- Booking details -->
      <div class="lg:basis-xs grow max-w-lg">
        <div>
          <h3 class="mx-4 text-lg text-neutral-600">Rezerwacja samochodu</h3>
          <hr class="border-neutral-400 my-2">
          <BookingDetailsTable :booking="booking"/>
        </div>
        <!-- Rent details -->
        <div v-if="showRentDetails" class="mt-4">
          <h3 class="mx-4 text-lg text-neutral-600">Wynajem samochodu</h3>
          <hr class="border-neutral-400 my-2">
          <RentDetailsTable :rent="booking.rent" />
        </div>
      </div>
    </div>
  </div>
</template>