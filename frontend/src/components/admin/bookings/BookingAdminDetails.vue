<script setup lang="ts">
  import CarDetailsCard from '@/components/cars-collection/CarDetailsCard.vue';
  import UserDetailsTable from '@/components/bookings/UserDetailsTable.vue';
  import BookingDetailsTable from '@/components/bookings/BookingDetailsTable.vue';
  import RentDetailsTable from '@/components/bookings/RentDetailsTable.vue';
  import { Booking } from '@/utilities/models/bookingModel';
  import { computed, type PropType } from 'vue';

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
  <!-- Booking ID and status-->
  <div class="flex justify-between my-8 mx-8">
    <dl class="text-neutral-600">
      <div class="flex gap-4">
        <dt>Id:</dt>
        <dd>{{ booking._id }}</dd>
      </div>
      <div class="flex gap-8">
        <dt>Status:</dt>
        <dd>{{ status[booking.status] }}</dd>
      </div>
    </dl>
  </div>
  <div class="flex flex-col lg:flex-row max-w-xl lg:max-w-full justify-around gap-8 xl:gap-16 mx-auto">
    <div class="lg:basis-xs grow max-w-xl">
      <CarDetailsCard :car="booking.car"/>
    </div>
    <div class="lg:basis-xs grow max-w-xl">
      <!-- User details -->
      <div>
        <h3 class="mx-4 text-lg text-neutral-600">Użytkownik</h3>
        <hr class="border-neutral-400 my-2">
        <UserDetailsTable :user="booking.user"/>
      </div>
      <!-- Booking details -->
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
</template>