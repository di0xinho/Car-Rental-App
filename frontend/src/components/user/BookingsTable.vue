<script setup lang="ts">
  import { Booking } from '@/utilities/models/bookingModel';

  const { bookings, selectedBookingIndex } = defineProps({
    bookings: {type: Array<Booking>, required: true},
    selectedBookingIndex: {type: [Number, null], required: true}
  });

  defineEmits<{selectBooking: [bookingIndex: number]}>();

  const statusEntities = {
    'awaiting': '&#9719;',
    'active': '&#9733;',
    'complete': '&#10004;',
    'canceled': '&#10005;',
    'missing': '&#x26A0;'
  }
</script>

<template>
  <div class="border border-gray-300 rounded-lg overflow-hidden">
      <table class="table-fixed w-full text-sm xs:text-base text-black">
        <colgroup>
          <col class="w-32 hidden lg:table-column"/>
          <col class="w-30 xs:w-40"/>
          <col class="w-20 xs:w-26"/>
          <col class="w-20 xs:w-26"/>
          <col class="w-16 hidden sm:table-column"/>
          <col class="w-8 lg:w-20 hidden xs:table-column" />
          <col class="w-8 lg:w-16"/>
        </colgroup>
        <thead>
          <tr class="bg-gray-100">
            <th class="hidden lg:table-cell text-left font-medium py-2 px-1 xs:px-2">ID</th>
            <th class="text-left font-medium py-2 px-1 xs:px-2">Samochód</th>
            <th class="text-left font-medium py-2 px-1 xs:px-2">Od</th>
            <th class="text-left font-medium py-2 px-1 xs:px-2">Do</th>
            <th class="text-left font-medium py-2 px-1 xs:px-2 hidden sm:table-cell">Cena</th>
            <th class="font-medium py-2 px-2 hidden xs:table-cell">
              <span class="hidden lg:inline">Płatność</span>
              <span class="inline-block lg:hidden">$</span>
            </th>
            <th class="font-medium py-2 px-1 xs:px-2">
              <span class="hidden lg:inline">Status</span>
              <span class="inline-block lg:hidden">&#8943;</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(booking, index) in bookings" class="border-t border-gray-300 cursor-pointer" @click="$emit('selectBooking', index)" :class="[selectedBookingIndex === index ? 'bg-dominant-secondary' : 'bg-light-bg']">
            <td class="hidden lg:table-cell overflow-hidden text-ellipsis py-2 px-2">{{ booking._id }}</td>
            <td class="py-2 px-1 xs:px-2">{{ booking.car.make + " " + booking.car.model }}</td>
            <td class="py-2 px-1 xs:px-2">{{ booking.bookedTimeSlots.from.slice(0, 10) }}</td>
            <td class="py-2 px-1 xs:px-2">{{ booking.bookedTimeSlots.to.slice(0, 10) }}</td>
            <td class="py-2 px-1 xs:px-2 hidden sm:table-cell">{{ booking.totalPrice }}</td>
            <td class="py-2 px-2 text-center hidden xs:table-cell">{{ booking.isPaid ? "&#10004;" : "&#10006;" }}</td>
            <td class="py-2 px-1 xs:px-2 text-center">
              <span v-html="statusEntities[booking.status]"></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>