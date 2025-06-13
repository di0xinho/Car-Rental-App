<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { getAllBookings } from '@/utilities/bookingUtils';
  import { Booking, type BookingStatus } from '@/utilities/models/bookingModel';
  import BookingsAdminTable from '@/components/admin/bookings/BookingsAdminTable.vue';
  import BookingAdminDetails from '@/components/admin/bookings/BookingAdminDetails.vue';
  import CarDetailsCard from '@/components/cars-collection/CarDetailsCard.vue';
  import StartRentForm from '@/components/admin/bookings/StartRentForm.vue';
  import ListPaginator from '@/components/paginator/ListPaginator.vue';

  const bookings = ref<Booking[]>([]);
  const selectedBookingIndex = ref<number|null>(null);
  const selectedBooking = computed(() => {
    if (bookings.value.length > 0 && selectedBookingIndex.value !== null) {
      return bookings.value[selectedBookingIndex.value]
    } else {
      return null;
    }
  });

  const page = ref(1);
  const totalPages = ref(1);

  const action = ref<'rent'|'cancel'| null>(null);

  const status = {
    awaiting: 'oczekujące',
    active: 'aktywne',
    canceled: 'anulowane',
    missing: 'brak wypożyczenia',
    complete: 'zakończone',
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
 <section class="min-h-full flex flex-col gap-8 p-4 xl:p-8">
    <h2 class="text-xl xs:text-2xl">
      Rezerwacje
    </h2>
    <!-- Tabela Rezerwacji -->
    <BookingsAdminTable :bookings="bookings" :selected-booking-index="selectedBookingIndex" @select-booking="handleSelectBooking"/>
    <div>
      <ListPaginator :active-page="page" :total-pages="totalPages" @change-page="handleChangePage"/>
    </div>
    <!-- Szczegóły wybranej rezerwacji -->
    <section class="relative p-4 xl:p-8 bg-light-bg rounded-lg grow">
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
          <div class="flex gap-8">
            <button @click="action = 'rent'">Rozpocznij wynajem</button>
            <button @click="action = 'cancel'">Anuluj rezerwację</button>
          </div>
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
      <div v-if="selectedBooking && (action === 'rent')" class="absolute top-0 left-0 z-30 bg-neutral-100/75 w-full h-full flex items-center">
        <div class="bg-light-bg mx-auto w-4/5 h-max-4/5 p-16 shadow-[12px_8px_28px_#00000050]">
          <StartRentForm :booking-id="selectedBooking._id" @close="action = null" @rent="updateSelectedBookingData"/>
        </div>
      </div>
    </section>
  </section>
</template>