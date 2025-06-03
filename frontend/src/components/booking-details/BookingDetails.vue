<script setup lang="ts">
  import { Booking } from '@/utilities/models/bookingModel';
  import { type PropType } from 'vue';
  import CarDetailsCard from '@/components/cars-collection/CarDetailsCard.vue';

  defineProps({
    booking: {type: Object as PropType<Booking>, required: true}
  });
</script>

<template>
  <div>
    <!-- Booking ID and Status -->
    <h4 class="my-2 mx-8 text-sm text-neutral-600">ID: {{ booking._id }}</h4>
    <div class="flex flex-col lg:flex-row max-w-lg lg:max-w-full gap-8 xl:gap-16 lg:items-center mx-auto">
      <!-- Car details -->
      <div class="lg:basis-xs grow max-w-lg">
        <CarDetailsCard :car="booking.car"/>
      </div>
      <!-- Booking details -->
      <div class="lg:basis-xs grow max-w-lg">
        <dl class="grid grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <dt class="text-sm text-neutral-600 mb-2">Od</dt>
            <dd class="mx-4">{{ booking.bookedTimeSlots.from }}</dd>
          </div>
          <div>
            <dt class="text-sm text-neutral-600 mb-2">Do</dt>
            <dd class="mx-4">{{ booking.bookedTimeSlots.to }}</dd>
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
            <dt class="text-sm text-neutral-600 mb-2">Status</dt>
            <dd class="mx-4" :class="[booking.isPaid ? 'text-lime-700' : 'text-orange-700']">
              <span>{{ booking.isPaid ? "&#10004;" : "&#33;" }}</span>
              <span class="text-sm ml-3">
                {{ booking.isPaid ? "opłacona" : "nieopłacona" }}
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>