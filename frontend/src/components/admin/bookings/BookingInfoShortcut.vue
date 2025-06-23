<script setup lang="ts">
  import { Booking, type BookingStatus } from '@/utilities/models/bookingModel';
  import { computed, type PropType } from 'vue';

  const { booking } = defineProps({
    booking: {type: Object as PropType<Booking>, required: true}
  });

  const bookingFrom = computed(() => {
    const from = booking.bookedTimeSlots.from.split('T');
    return {day: from[0] , hour: from[1].slice(0, 5) };
  });

  const bookingTo = computed(() => {
    const to = booking.bookedTimeSlots.to.split('T');
    return {day: to[0] , hour: to[1].slice(0, 5)};
  });
</script>

<template>
  <table class="table-fixed w-full border-separate border-spacing-x-0 border-spacing-y-2">
    <!-- User data -->
    <tr class="text-left text-sm text-neutral-600">
      <th id="booking-from" class="font-normal px-4 pt-1">Imię i nazwisko</th>
      <th id="booking-to" class="font-normal px-4 pt-1">Numer telefonu</th>
    </tr>
    <tr class="bg-light-tertiary">
      <td headers="booking-from" class="px-4 py-2 rounded-l-lg">
        {{ booking.user.firstName + " " + booking.user.surname }}
      </td>
      <td headers="booking-to" class="px-4 py-2 rounded-r-lg">
        {{ booking.user.phoneNumber }}
      </td>
    </tr>
    <!-- Time slots -->
    <tr class="text-left text-sm text-neutral-600">
      <th id="booking-from" class="font-normal px-4 pt-1">Od</th>
      <th id="booking-to" class="font-normal px-4 pt-1">Do</th>
    </tr>
    <tr class="bg-light-tertiary">
      <td headers="booking-from" class="px-4 py-2 rounded-l-lg">
        <div class="font-medium">{{ bookingFrom.day }}</div>
        <div class="text-neutral-500">godz. {{ bookingFrom.hour }}</div>
      </td>
      <td headers="booking-to" class="px-4 py-2 rounded-r-lg">
        <div class="font-medium">{{ bookingTo.day }}</div>
        <div class="text-neutral-500">godz. {{ bookingTo.hour }}</div>
      </td>
    </tr>
    <!-- Total price payment status -->
    <tr class="hidden xs:table-row text-left text-sm text-neutral-600">
      <th id="booking-totalprice" class="font-normal px-4 pt-3">Cena całkowita</th>
      <th id="booking-paymentstatus" class="font-normal px-4 pt-3">Status płatności</th>
    </tr>
    <tr class="hidden xs:table-row bg-light-tertiary">
      <td headers="booking-totalprice" class="px-4 py-2 rounded-l-lg font-medium">
        {{ booking.totalPrice }} ZŁ
      </td>
      <td headers="booking-paymentstatus" class="px-4 py-2 rounded-r-lg font-medium" :class="[booking.isPaid ? 'text-lime-800' : 'text-amber-800']">
        <span>{{ booking.isPaid ? "&#10004;" : "&#10005;" }}</span>
        <span class="ml-3">
          {{ booking.isPaid ? "opłacona" : "nieopłacona" }}
        </span>
      </td>
    </tr>
  </table>
</template>