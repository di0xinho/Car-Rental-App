<script setup lang="ts">
  import { Booking, type BookingStatus } from '@/utilities/models/bookingModel';
  import { Car } from '@/utilities/models/carModel';
  import { getUserBookings } from '@/utilities/bookingUtils';
  import { RouterLink } from 'vue-router';
  import { onMounted, ref, watch } from 'vue';
  import ActiveBookingPanel from '@/components/user/ActiveBookingPanel.vue';
  import HorizontalList from '@/components/ui-common/HorizontalList.vue';
  import CarViewCard from '@/components/cars-collection/CarViewCard.vue';
  import { getFavoriteCars } from '@/utilities/carUtils';
  import CarSvg from '@/components/icons/CarSvg.vue';

  const activeBooking = ref<Booking|undefined>();
  const favoriteCars = ref<Car[]>([]);


  onMounted(async() => {
    // Fetching favorite cars
    try {
      const favoritesResult = await getFavoriteCars();
      console.log('favorite cars: ', favoritesResult.favoriteCars);
      favoriteCars.value = favoritesResult.favoriteCars;
    } catch (error) {
      console.error(error);
    }
    // Fetching active bookings
    try {
      const bookingStatus: BookingStatus[] = ['active'];
      const bookingsResult = await getUserBookings(bookingStatus);
      activeBooking.value = bookingsResult.bookings[0];
    } catch (error) {
      console.error(error);
    }
  });

  function handleRemoveFromFavorites (carId: string) {
    favoriteCars.value = favoriteCars.value.filter((car) => car._id !== carId);
  }
</script>

<template>
  <div class="min-h-full flex flex-col gap-8 p-4 xl:p-8">
    <h2 class="text-xl xs:text-2xl">Lista ulubionych samochodów</h2>
    <section class="bg-dominant-secondary px-4 py-4 rounded-2xl">
      <div v-if="favoriteCars.length > 0">
        <HorizontalList>
          <li v-for="(car, index) in favoriteCars" :key="index" class="min-w-xs basis-[calc(1/4_*_(100%_-_96px))] shrink-0 grow">
            <CarViewCard :car="car" card-background="bg-light-bg" @removed-from-favorites="handleRemoveFromFavorites" />
          </li>
        </HorizontalList>
      </div>
      <h3 v-else class="text-xl xs:text-2xl text-center">
        Lista ulubionych samchodów jest pusta.
      </h3>
    </section>
    <nav>
      <ul class="flex gap-5 items-center">
        <li>
          <RouterLink :to="{name: 'user-history'}" class="text-sm xs:text-base">
            Historia wynajmu
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{name: 'user-bookings'}" class="text-sm xs:text-base">
            <span class="hidden xs:inline-block">Moje</span> <span class="capitalize xs:normal-case">rezerwacje</span>
          </RouterLink>
        </li>
        <li class="ml-auto">
          <RouterLink :to="{name: 'rent'}" class="flex gap-3 bg-light-tertiary border border-dominant-secondary px-4 py-1 rounded-full">
            <CarSvg />
            <span class="text-sm xs:text-base">
              Wynajmij <span class="hidden xs:inline-block">samochód</span>
            </span>
          </RouterLink>
        </li>
      </ul>
    </nav>
    <h2 class="text-xl xs:text-2xl">Aktywne wypożyczenia</h2>
    <div v-if="activeBooking" class="my-auto">
      <!-- Actual ongoing rent -->
      <ActiveBookingPanel :booking="activeBooking" />
    </div>
    <div v-else class="my-auto">
      <h3 class="text-lg xs:text-xl text-center my-12">Brak aktywnych wypożyczeń</h3>
    </div>
  </div>
</template>