<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { getAllBookings } from '@/utilities/bookingUtils';
  import { Booking, type BookingStatus } from '@/utilities/models/bookingModel';
  import BookingsAdminTable from '@/components/admin/bookings/BookingsAdminTable.vue';
  import BookingAdminDetails from '@/components/admin/bookings/BookingAdminDetails.vue';
  import CarDetailsCard from '@/components/cars-collection/CarDetailsCard.vue';
  import SetBookingStatusForm from '@/components/admin/bookings/SetBookingStatusForm.vue';
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

  const action = ref<'status'| null>(null);

  const status = {
    awaiting: 'oczekująca',
    active: 'aktywna',
    canceled: 'anulowana',
    missing: 'brak wypożyczenia',
    complete: 'zakończona',
  };

  async function getBookingsData() {
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
<h1 class="text-xl xs:text-2xl mx-8 lg:mx-16 my-16">Historia rezerwacji</h1>
  <!-- Tabela Rezerwacji -->
  <section class="mx-8 my-16">
    <div class="min-h-40">
      <BookingsAdminTable :bookings="bookings" :selected-booking-index="selectedBookingIndex" @select-booking="handleSelectBooking"/>
    </div>
    <div class="mx-8 my-16">
      <ListPaginator :active-page="page" :total-pages="totalPages" @change-page="handleChangePage"/>
    </div>
  </section>
  <!-- Szczegóły wybranej rezerwacji -->
  <section class="mx-8 my-16 relative p-4 xl:p-8 bg-light-bg rounded-lg grow">
    <h3 class="text-xl xs:text-2xl my-4 mx-8">Szczegóły rezerwacji</h3>
    <div v-if="selectedBooking">
      <!-- Booking ID and status-->
      <div class="flex justify-between my-8 mx-8">
        <dl class="text-neutral-600">
          <div class="flex gap-4">
            <dt>Id:</dt>
            <dd>{{ selectedBooking._id }}</dd>
          </div>
          <div class="flex gap-8">
            <dt>Status:</dt>
            <dd>{{ status[selectedBooking.status] }}</dd>
          </div>
        </dl>
        <button @click="action = 'status'">Zmień status</button>
      </div>
      <div class="flex flex-col lg:flex-row max-w-xl lg:max-w-full justify-around gap-8 xl:gap-16 mx-auto">
        <div class="lg:basis-xs grow">
          <CarDetailsCard :car="selectedBooking.car"/>
        </div>
        <div class="lg:basis-xs grow">
          <BookingAdminDetails :booking="selectedBooking"/>
        </div>
      </div>
    </div>
    <div v-else>
      <h4 class="text-center my-12">
        {{ bookings.length > 0 ? 'Wybierz rezerwację z tabeli powyżej aby wyświetlić szczegóły' : 'Brak rezerwacji' }}
      </h4>
    </div>
    <div v-if="selectedBooking && action" class="absolute top-0 left-0 z-30 bg-neutral-100/75 w-full h-full flex items-center">
      <div class="bg-light-bg mx-auto w-4/5 max-w-2xl p-16 shadow-[12px_8px_28px_#00000050]">
        <SetBookingStatusForm v-if="action === 'status'" :booking-id="selectedBooking._id" :booking-status="selectedBooking.status" @close="action = null" @update-booking="updateSelectedBookingData"/>
      </div>
    </div>
  </section>
</template>