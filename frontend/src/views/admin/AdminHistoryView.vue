<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { getAllBookings } from '@/utilities/bookingUtils';
  import { Booking, type BookingStatus } from '@/utilities/models/bookingModel';
  import BookingsAdminTable from '@/components/admin/bookings/BookingsAdminTable.vue';
  import BookingsStatusLegend from '@/components/bookings/BookingsStatusLegend.vue';
  import BookingAdminDetails from '@/components/admin/bookings/BookingAdminDetails.vue';
  import SetBookingStatusForm from '@/components/admin/bookings/SetBookingStatusForm.vue';
  import ListPaginator from '@/components/paginator/ListPaginator.vue';
  import DeleteBookingModal from '@/components/admin/bookings/DeleteBookingModal.vue';
  import PenSvg from '@/components/icons/PenSvg.vue';

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

  const action = ref<'status'| null>(null);

  async function getBookings() {
    try {
      const bookingStatus: BookingStatus[] = ['canceled', 'missing', 'complete'];
      const result = await getAllBookings(bookingStatus, page.value);
      console.log(result);
      bookings.value = result.bookings;
      totalPages.value = result.numOfPages;
    } catch (error) {
      console.error(error);
    }
  }

  onMounted(async() => {
    getBookings();
  });

  async function handleChangePage (event: number) {
      page.value = event;
      getBookings();
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
  <header class="mx-4 sm:mx-8 lg:mx-16 my-16">
    <h1 class="text-xl xs:text-2xl">Historia rezerwacji</h1>
    <h2 class="text-sm xs:text-base text-neutral-600 dark:text-neutral-300">
      Lista zakończonych i anulowanych rezerwacji
    </h2>
  </header>  
  <!-- Tabela Rezerwacji -->
  <section class="mx-4 sm:mx-8 my-16">
    <div class="min-h-40">
      <BookingsAdminTable :bookings="bookings" :selected-booking-index="selectedBookingIndex" @select-booking="handleSelectBooking"/>
    </div>
    <div class="my-8">
      <h3 class="text-neutral-500 dark:text-neutral-300 mb-2">Status rezerwacji:</h3>
      <BookingsStatusLegend />
    </div>
    <div class="mx-8 my-16">
      <ListPaginator :active-page="page" :total-pages="totalPages" @change-page="handleChangePage"/>
    </div>
  </section>
  <!-- Szczegóły wybranej rezerwacji -->
  <section class="mx-4 sm:mx-8 my-16 relative p-4 xl:p-8 bg-light-bg rounded-lg grow text-black">
     <div class="flex gap-x-8 gap-y-4 flex-wrap justify-between items-center my-4 mx-4 sm:mx-8">
      <h3 class="text-xl xs:text-2xl">Szczegóły rezerwacji</h3>
      <div v-if="selectedBooking" class="flex flex-wrap gap-x-8 gap-y-4">
        <button type="button" @click="action = 'status'" class="w-53 flex gap-3 justify-center items-center btn-secondary">
          <PenSvg />
          <span>Zmień status</span>
        </button>
        <DeleteBookingModal :booking="selectedBooking" @deleted="getBookings" btn-class="w-53 justify-center"/>
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
      <div class="bg-light-tertiary mx-auto min-w-xs w-4/5 max-w-2xl p-4 sm:p-8 rounded-lg shadow-[12px_8px_28px_#00000050]">
        <SetBookingStatusForm v-if="action === 'status'" :booking-id="selectedBooking._id" :booking-status="selectedBooking.status" @close="action = null" @update-booking="updateSelectedBookingData"/>
      </div>
    </div>
  </section>
</template>