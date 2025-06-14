<script setup lang="ts">
  import { Booking, type BookingStatus } from '@/utilities/models/bookingModel';
  import { computed, type PropType } from 'vue';
  import CarDetailsCard from '@/components/cars-collection/CarDetailsCard.vue';

  const { booking } = defineProps({
    booking: {type: Object as PropType<Booking>, required: true}
  });

  const status = {
    awaiting: 'oczekujące',
    active: 'aktywne',
    canceled: 'anulowane',
    missing: 'brak wypożyczenia',
    complete: 'zakończone',
  }

  const bookingFrom = computed(() => {
    const from = booking.bookedTimeSlots.from.split('T');
    return {day: from[0] , hour: from[1].slice(0, 5) };
  });

  const bookingTo = computed(() => {
    const to = booking.bookedTimeSlots.to.split('T');
    return {day: to[0] , hour: to[1].slice(0, 5)};
  });

  const distance = computed(() => {
    if (booking.rent?.carMileageAtEnd && booking.rent?.carMileageAtStart) {
      return booking.rent.carMileageAtEnd - booking.rent.carMileageAtStart;
    } else {
      return 'brak danych';
    }
  });

  const showRentDetails = computed(() => {
    return (booking.status === 'complete' || booking.status === 'active') && booking.hasOwnProperty('rent');
  });
</script>

<template>
  <div>
    <!-- Booking ID and status-->
    <dl class="my-4 mx-8 text-neutral-600">
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
        <dl class="grid grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <dt class="text-sm text-neutral-600 mb-2">Od</dt>
            <dd class="mx-4">
              <div>{{ bookingFrom.day }}</div>
              <div>godz. {{ bookingFrom.hour }}</div>
            </dd>
          </div>
          <div>
            <dt class="text-sm text-neutral-600 mb-2">Do</dt>
            <dd class="mx-4">
              <div>{{ bookingTo.day }}</div>
              <div>godz. {{ bookingTo.hour }}</div>
            </dd>
          </div>
          <div>
            <dt class="text-sm text-neutral-600 mb-2">Ilość godzin</dt>
            <dd class="mx-4">{{ booking.totalHours }}</dd>
          </div>
          <div>
            <dt class="text-sm text-neutral-600 mb-2">Cena za godzinę</dt>
            <dd class="mx-4">{{ booking.car.hourlyPrice }}</dd>
          </div>
          <div>
            <dt class="text-sm text-neutral-600 mb-2">Cena całkowita</dt>
            <dd class="mx-4">{{ booking.totalPrice }}</dd>
          </div>
          <div>
            <dt class="text-sm text-neutral-600 mb-2">Status płatności</dt>
            <dd class="mx-4" :class="[booking.isPaid ? 'text-lime-700' : 'text-orange-700']">
              <span>{{ booking.isPaid ? "&#10004;" : "&#10005;" }}</span>
              <span class="text-sm ml-3">{{ booking.isPaid ? "opłacona" : "nieopłacona" }}</span>
            </dd>
          </div>
          <div class="col-span-full flex gap-6 items-center">
            <dt class="text-sm text-neutral-600">Samochód z kierowcą:</dt>
            <dd>
              <span class="text-sm">{{ booking.driver ? "&#10004;" : "&#10005;" }}</span>
              <span class="text-sm ml-3">{{ booking.driver ? "TAK" : "NIE" }}</span>
            </dd>
          </div>
        </dl>
        <!-- Rent details -->
        <div v-if="showRentDetails">
          <h3 class="my-4">Szczegóły wynajmu samochodu</h3>
          <hr>
          <dl class="grid grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <dt class="text-sm text-neutral-600 mb-2">Odebrano auto</dt>
              <dd>{{ booking.rent.from }}</dd>
            </div>
            <div>
              <dt class="text-sm text-neutral-600 mb-2">Zwrócono auto</dt>
              <dd>{{ booking.rent.to }}</dd>
            </div>
            <div class="col-span-full flex gap-6 items-center">
              <dt class="text-sm text-neutral-600 mb-2">Kilometraż</dt>
              <dd class="mx-4">{{ distance }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>