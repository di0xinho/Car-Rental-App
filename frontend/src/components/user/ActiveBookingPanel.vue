<script setup lang="ts">
  import { Booking, type BookingStatus } from '@/utilities/models/bookingModel';
  import { onMounted, ref, computed, type PropType } from 'vue';
  import { getCarTelemetryData } from '@/utilities/carTelemetryUtils';
  import BookingCarLocation from '@/components/bookings/BookingCarLocation.vue';

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

  const rentFrom = computed(() => {
    if (booking.rent?.from) {
      const from = booking.rent.from.split('T');
      return {day: from[0] , hour: from[1].slice(0, 5) };
    }
  });

  const currentMileage = ref<number|null>(null);
  const carPosition = ref<{lat: number, lng: number}>();

  const distance = computed(() => {
    if (currentMileage.value && booking.rent.carMileageAtStart) {
      return currentMileage.value - booking.rent.carMileageAtStart;
    } else {
      return 'brak danych';
    }
  });
  
  onMounted(async () => {
    const carTelemetry = getCarTelemetryData();
    carPosition.value = carTelemetry.position;
    currentMileage.value = carTelemetry.mileage;
  });

  function refreshCarTelemetryData () {
    const carTelemetry = getCarTelemetryData();
    carPosition.value = carTelemetry.position;
    currentMileage.value = carTelemetry.mileage;
  }
</script>

<template>
  <div class="flex flex-col lg:flex-row gap-8">
    <div class="basis-3xs shrink-0 grow bg-light-bg text-dark-txt rounded-3xl p-4">
      <!-- Refresh button -->
      <div class="my-4">
        <button @click="refreshCarTelemetryData" class="flex gap-3 ml-auto btn-secondary">
          <span class="text-sm/[22px]">Odśwież</span>
          <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
              <path d="M23 7L23 14C23 16.2091 21.2091 18 19 18L6 18"/>
              <path d="M1 15L1 8C1 5.79086 2.79086 4 5 4L18 4"/>
              <path d="M9 21L6 18L9 15"/>
              <path d="M15 7L18 4L15 1"/>
            </g>
          </svg>
        </button>
      </div>
      <!-- Booking information -->
      <dl class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-1 gap-4">
        <div>
          <dt class="text-sm text-neutral-600 mb-4">Wynajem</dt>
          <dd>
            <div class="px-4 py-1 bg-light-tertiary rounded-lg my-2">
              <span class="text-sm text-neutral-600 mr-4">od</span>
              <span class="font-semibold mr-3">{{ rentFrom?.day  }}</span>
              <span>{{ rentFrom?.hour }}</span>
            </div>
          </dd>
        </div>
        <div>
          <dt class="text-sm text-neutral-600 mb-4">Rezerwacja</dt>
          <dd>
            <div class="px-4 py-1 bg-light-tertiary rounded-lg my-2">
              <span class="text-sm text-neutral-600 mr-4">od</span>
              <span class="font-semibold mr-3">{{ bookingFrom?.day  }}</span>
              <span>{{ bookingFrom?.hour }}</span>
            </div>
            <div class="px-4 py-1 bg-light-tertiary rounded-lg my-2">
              <span class="text-sm text-neutral-600 mr-4">do</span>
              <span class="font-semibold mr-3">{{ bookingTo?.day  }}</span>
              <span>{{ bookingTo?.hour }}</span>
            </div>
          </dd>
        </div>
        <div>
          <dt class="text-sm text-neutral-600 mb-4">Zapłacono</dt>
          <dd>
            <div class="px-4 py-1 bg-light-tertiary rounded-lg my-2">
              <span class="font-semibold">{{ booking.totalPrice}}</span> <span class="text-neutral-600">ZŁ</span>
            </div>
          </dd>
        </div>
        <div>
          <dt class="text-sm text-neutral-600 mb-4">Przejechane kilometry</dt>
          <dd>
            <div class="px-4 py-1 bg-light-tertiary rounded-lg my-2">
              <span class="font-semibold">{{ distance }}</span> <span class="text-neutral-600">KM</span>
            </div>
          </dd>
        </div>
      </dl>
    </div>
    <!-- Car location -->
    <div class="basis-3/5 bg-light-bg text-dark-txt rounded-3xl p-4 flex flex-col">
      <h3 class="text-xl xs:text-2xl my-4 mx-8">Lokalizacja samochodu</h3>
      <div class="min-h-80 grow">
        <BookingCarLocation v-if="carPosition" :car-position="carPosition"/>
        <h4 v-else class="text-center my-12">Lokalizacja samochodu nieznana!</h4>
      </div>
    </div>
  </div>
</template>