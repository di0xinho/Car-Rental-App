<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { getUserBookings } from '@/utilities/bookingUtils';
  import { Booking, type BookingStatus } from '@/utilities/models/bookingModel';
  import BookingDetails from '@/components/user/BookingDetails.vue';
  import BookingsTable from '@/components/user/BookingsTable.vue';
  import BookingsStatusLegend from '@/components/bookings/BookingsStatusLegend.vue';

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
      const bookingStatus: BookingStatus[] = ['awaiting', 'active'];
      const result = await getUserBookings(bookingStatus);
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
    <!-- Tabela Rezerwacji -->
    <BookingsTable :bookings="bookings" :selected-booking-index="selectedBookingIndex" @select-booking="selectedBookingIndex = $event"/>
    <div>
      <h3 class="text-neutral-500 mb-2">Status rezerwacji:</h3>
      <BookingsStatusLegend />
    </div>
    <!-- Szczegóły wybranej rezerwacji -->
    <section class="p-4 xl:p-8 bg-light-bg rounded-lg grow">
      <h3 class="text-xl xs:text-2xl my-4 mx-8">Szczegóły rezerwacji</h3>
      <div v-if="selectedBooking">
        <BookingDetails :booking="selectedBooking"/>
      </div>
      <div v-else>
        <h4 class="text-center my-12">
          {{ bookings.length > 0 ? 'Wybierz rezerwację z tabeli powyżej aby wyświetlić szczegóły' : 'Brak rezerwacji' }}
        </h4>
      </div>
    </section>
  </section>
</template>