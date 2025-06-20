<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { getAllBookings } from '@/utilities/bookingUtils';
  import { Booking, type BookingStatus } from '@/utilities/models/bookingModel';
  import BookingsAdminTable from '@/components/admin/bookings/BookingsAdminTable.vue';
  import BookingsStatusLegend from '@/components/bookings/BookingsStatusLegend.vue';
  import BookingAdminDetails from '@/components/admin/bookings/BookingAdminDetails.vue';
  import StartRentForm from '@/components/admin/bookings/StartRentForm.vue';
  import CancelBookingForm from '@/components/admin/bookings/CancelBookingForm.vue';
  import ListPaginator from '@/components/paginator/ListPaginator.vue';

  const bookings = ref<Booking[]>([]);
  const selectedBookingIndex = ref<number|null>(null);
  const selectedBooking = computed(() => {
    if (bookings.value.length > 0 && selectedBookingIndex.value !== null) {
      return bookings.value[selectedBookingIndex.value];
    } else {
      return null;
    }
  });

  const page = ref(1);
  const totalPages = ref(1);

  const action = ref<'start-rent'|'cancel'|null>(null);

  const status = {
    awaiting: 'oczekująca',
    active: 'aktywna',
    canceled: 'anulowana',
    missing: 'brak wypożyczenia',
    complete: 'zakończona',
  };

  async function getBookingsData() {
    try {
      const bookingStatus: BookingStatus[] = ['awaiting', 'active'];
      const result = await getAllBookings(bookingStatus, page.value);
      console.log(result);
      bookings.value = result.bookings;
      totalPages.value = result.numOfPages;
    } catch (error) {
      console.error(error);
    }
  }

  onMounted(async() => {
    getBookingsData();
  });

  async function handleChangePage (event: number) {
    page.value = event;
    getBookingsData();
  }

  function handleSelectBooking(bookingIndex: number) {
    selectedBookingIndex.value = bookingIndex;
    action.value = null;
  }

  function updateSelectedBookingData(booking: Booking) {
    if (selectedBookingIndex.value !== null) bookings.value[selectedBookingIndex.value] = booking;
    action.value = null;
  }
</script>

<template>
    <header class="mx-8 lg:mx-16 my-16">
      <h1 class="text-xl xs:text-2xl">Rezerwacje</h1>
      <h2 class="text-sm xs:text-base text-neutral-600">
        Lista rezerwacji oczekujących na wynajem
      </h2>
  </header>
  <!-- Tabela Rezerwacji -->
  <section class="mx-8 my-16">
    <div class="min-h-40">
      <BookingsAdminTable :bookings="bookings" :selected-booking-index="selectedBookingIndex" @select-booking="handleSelectBooking"/>
    </div>
    <div class="my-8">
      <h3 class="text-neutral-500 mb-2">Status rezerwacji:</h3>
      <BookingsStatusLegend />
    </div>
    <div class="mx-8 my-16">
      <ListPaginator :active-page="page" :total-pages="totalPages" @change-page="handleChangePage"/>
    </div>
  </section>
  <!-- Szczegóły wybranej rezerwacji -->
  <section class="mx-8 my-16 relative p-4 xl:p-8 bg-light-bg rounded-lg grow">
    <div class="flex justify-between items-center my-4 mx-8">
      <h3 class="text-xl xs:text-2xl">Szczegóły rezerwacji</h3>
      <div v-if="selectedBooking" class="flex gap-8">
        <button type="button" @click="action = 'start-rent'">Rozpocznij wynajem</button>
        <button type="button" @click="action = 'cancel'">Anuluj rezerwację</button>
      </div>
    </div>
    <div v-if="selectedBooking">
       <BookingAdminDetails :booking="selectedBooking"/>
    </div>
    <div v-else>
      <h4 class="text-center my-12">
        {{ bookings.length > 0 ? 'Wybierz rezerwację z tabeli powyżej aby wyświetlić szczegóły' : 'Brak rezerwacji' }}
      </h4>
    </div>
    <div v-if="selectedBooking && action" class="absolute top-0 left-0 z-30 bg-neutral-100/75 w-full h-full flex items-center">
      <div class="bg-light-bg mx-auto w-4/5 max-w-2xl p-16 shadow-[12px_8px_28px_#00000050]">
        <StartRentForm v-if="action === 'start-rent'" :booking-id="selectedBooking._id" @close="action = null" @update-booking="updateSelectedBookingData"/>
        <CancelBookingForm v-if="action === 'cancel'" :booking-id="selectedBooking._id" @close="action = null" @update-booking="updateSelectedBookingData"/>
      </div>
    </div>
  </section>
</template>