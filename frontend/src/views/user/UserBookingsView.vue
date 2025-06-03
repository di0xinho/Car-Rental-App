<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { getBookings } from '@/utilities/bookingUtils';
  import { Booking } from '@/utilities/models/bookingModel';
  import BookingDetails from '@/components/booking-details/BookingDetails.vue';

  const bookings = ref<Booking[]>([]);
  const selectedBookingIndex = ref<number|null>(null);
  const selectedBooking = computed(() => {
    if (bookings.value.length > 0 && selectedBookingIndex.value !== null) {
      return bookings.value[selectedBookingIndex.value]
    } else {
      return null;
    }
  })

  onMounted(async() => {
    try {
      const result = await getBookings();
      console.log(result);
      bookings.value = result.bookings;
    } catch (error) {
      console.error(error);
    }
  });
</script>

<template>
  <section class="min-h-full flex flex-col gap-8 p-4 xl:p-8">
    <h2 class="text-xl xs:text-2xl">
      Moje rezerwacje
    </h2>
    <div class="border border-gray-300 rounded-lg overflow-hidden">
      <table class="table-fixed w-full text-sm xs:text-base">
        <colgroup>
          <col class="w-32 hidden lg:table-column"/>
          <col class="w-26 xs:w-32"/>
          <col class="w-20 xs:w-26"/>
          <col class="w-20 xs:w-26"/>
          <col class="w-12 xs:w-16"/>
          <col class="w-7 sm:w-20 hidden xs:table-column" />
        </colgroup>
        <thead class="text-left">
          <tr class="bg-gray-100">
            <th class="hidden lg:table-cell font-medium py-2 px-1 xs:px-2">ID</th>
            <th class="font-medium py-2 px-1 xs:px-2">Samochód</th>
            <th class="font-medium py-2 px-1 xs:px-2">Od</th>
            <th class="font-medium py-2 px-1 xs:px-2">Do</th>
            <th class="font-medium py-2 px-1 xs:px-2">Cena</th>
            <th class="font-medium py-2 px-2 hidden xs:table-cell">
              <span class="hidden sm:inline">Płatność</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(booking, index) in bookings" class="border-t border-gray-300 cursor-pointer" @click="selectedBookingIndex = index" :class="[selectedBookingIndex === index ? 'bg-dominant-secondary' : 'bg-light-bg']">
            <td class="hidden lg:table-cell overflow-hidden text-ellipsis py-2 px-2">{{ booking._id }}</td>
            <td class="py-2 px-1 xs:px-2">{{ booking.car.make + " " + booking.car.model }}</td>
            <td class="py-2 px-1 xs:px-2">{{ booking.bookedTimeSlots.from }}</td>
            <td class="py-2 px-1 xs:px-2">{{ booking.bookedTimeSlots.to }}</td>
            <td class="py-2 px-1 xs:px-2">{{ booking.totalPrice }}</td>
            <td class="py-2 px-2 hidden xs:table-cell">{{ booking.isPaid ? "&#10004;" : "&#10006;" }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="p-4 xl:p-8 bg-light-bg rounded-lg grow">
      <h3 class="text-xl xs:text-2xl my-4 mx-8">Szczegóły rezerwacji</h3>
      <div v-if="selectedBooking">
        <BookingDetails :booking="selectedBooking"/>
      </div>
      <div v-else>
        <h4 class="text-center my-12">
          {{ bookings.length > 0 ? 'Wybierz rezerwację z tabeli powyżej aby wyświetlić szczegóły' : 'Brak rezerwacji' }}
        </h4>
      </div>
    </div>
  </section>
</template>