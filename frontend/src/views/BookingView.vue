<script setup lang="ts">
  import UserDetails from '@/components/booking-form/UserDetails.vue';
  import BookingDetailsForm from '@/components/booking-form/BookingDetailsForm.vue';
  import BookingSummary from '@/components/booking-form/BookingSummary.vue';
  import PickPayment from '@/components/booking-form/PickPayment.vue';
  import type { CreateBookingDetails } from '@/utilities/models/bookingModel';
  import { useRoute, useRouter } from 'vue-router';
  import { onMounted, ref, computed, watch } from 'vue';
  import { Car } from '@/utilities/models/carModel';
  import { getCarById } from '@/utilities/carUtils';
  import { bookCar } from '@/utilities/bookingUtils';

  const route = useRoute();
  const router = useRouter();

  const from = ref<string>(route.query.from as string);
  const to = ref<string>(route.query.to as string);
  const driver = ref<boolean>(false);
  const car = ref<Car|null>(null);

  const rentPeriodIsValid = computed(() => {
    const dateFrom = new Date(from.value).valueOf();
    const dateTo = new Date(to.value).valueOf();
    return ( dateFrom < dateTo );
  });

  const totalHours = computed(() => {
    const fromTimestamp =  Date.parse(from.value);
    const toTimestamp =  Date.parse(to.value);
    return Math.ceil((toTimestamp - fromTimestamp) / 3600000);
  });

  const totalPrice = computed(() => {
    return totalHours.value * car.value!.hourlyPrice;
  });

  const status = ref<'details'|'payment'|'pending'>('details');
  const payment = ref<'stripe'|'on-the-spot'>('stripe');
  const policyAccepted = ref(false);
  let detailsAccepted = false;

  watch([from, to], ([newFrom, newTo]) => {
    router.replace({name: 'booking', query: {car_id: car.value!._id, from: newFrom, to: newTo}});
  })

  onMounted(async () => {
    try {
      const result = await getCarById(route.query.car_id as string);
      car.value = result.data;
    } catch (error) {
      console.error(error);
      router.replace({name: 'not-found'});
    }
  });

  function handleAcceptDetails () {
    detailsAccepted = true;
    status.value = 'payment';
  }

  async function handleBooking () {
    if (!detailsAccepted || !policyAccepted.value) {
      return console.error('Accept booking details and company policy to proceede!');
    }
    
    status.value = 'pending';

    const details: CreateBookingDetails = {
      carId: car.value!._id,
      totalHours: totalHours.value,
      totalPrice: totalPrice.value,
      driver: driver.value,
      bookedTimeSlots: {
        from: from.value.replace('T', ' '),
        to: to.value.replace('T', ' ')
      },
    }

    const successQueryParams = new URLSearchParams();
    successQueryParams.append('car_id', car.value!._id);
    successQueryParams.append('payment', payment.value);
    successQueryParams.append('total_price', totalPrice.value.toString());
    successQueryParams.append('from', from.value);
    successQueryParams.append('to', to.value);

    let success_url = '/rezerwacja/dodano-rezerwacje?' + successQueryParams;
    let cancel_url = '/rezerwacja/zakonczona-niepowodzeniem';

    try {
      const result = await bookCar(details, success_url, cancel_url, payment.value);
      if (payment.value === 'stripe' && result.url) {
        // Redirecting user to Stripe Checkout Page
        window.location.assign(result.url);
      } else if (payment.value === 'on-the-spot' && result.url) {
        router.push(result.url);
      } else {
        throw new Error('Niepoprawna odpowedź serwera.');
      }
    } catch (error) {
      console.error(error);
      router.push({name: 'booking-failure'});
    }
  }
</script>

<template>
  <section class="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-x-8 gap-y-16 xl:gap-16 mx-5 xs:mx-6 lg:mx-8 my-8">
      <!-- User Details -->
      <div class="col-start-1 min-w-xs px-4 lg:px-6 py-6 bg-light-secondary-bg rounded-3xl">
        <h3 class="text-xl font-semibold">Dane użytkownika</h3>
        <h4 class="text-sm text-neutral-500">
          Dane użytkownika możesz zmienić w panelu użytkownika w zakładce ustawienia.
        </h4>
        <div class="mt-8">
          <UserDetails />
        </div>
      </div>
      <!-- Booking Details -->
      <div class="col-start-1 min-w-xs px-4 lg:px-6 py-6 bg-light-secondary-bg rounded-3xl" :class="[status === 'details' ? 'scale-105 shadow-lg' : '']">
        <h3 class="text-xl font-semibold">Rezerwacja</h3>
        <h4 class="text-sm text-neutral-500">
          Uzupełnij dane dotyczące rezerwacji.
        </h4>
        <div class="my-8">
          <BookingDetailsForm
            v-model:from="from"
            v-model:to="to"
            v-model:driver="driver"
            :disabled="status !== 'details'"
            :rent-period-is-valid="rentPeriodIsValid"
          />
        </div>
        <button type="button" @click="handleAcceptDetails" class="btn block ml-auto" :disabled="(status !== 'details') || !rentPeriodIsValid">
          Potwierdzam i przechodzę do wyboru płatności
        </button>
      </div>
      <!-- Pyment Method -->
      <div class="col-start-1 min-w-xs px-4 lg:px-6 py-6 bg-light-secondary-bg rounded-3xl" :class="[status === 'payment' ? 'scale-105 shadow-lg' : '']">
        <h3 class="text-xl font-semibold">Płatność</h3>
        <h4 class="text-sm text-neutral-500">
          Wybierz formę płatności.
        </h4>
        <div class="my-8">
          <PickPayment v-model:payment="payment" :disabled="status !== 'payment'"/>
          <form class="flex my-8 gap-8">
            <input type="checkbox" name="accept-policy" id="accept-policy" v-model="policyAccepted" :disabled="status !== 'payment'">
            <label for="accept-policy">
              Zgadzam się z regulaminem i polityką prywatności
            </label>
          </form>
        </div>
        <div class="flex justify-between gap-8">
          <button type="button" @click="status='details'; detailsAccepted=false" class="lg:px-6 py-3">
            <span class="mr-4">&#10229;</span>Cofnij
          </button>
          <button type="button" class="btn" :disabled="(status !== 'payment') || !policyAccepted" @click="handleBooking">
            {{ payment === 'stripe' ? 'Zarezerwuj i zapłać online' : 'Zarezerwuj i zapłać na miejscu' }}
          </button>
        </div>
      </div>
    <!-- Booking Summary -->
    <div v-if="car" class="row-[1] md:col-start-2 md:row-[1_/_span_3] min-w-xs px-4 py-6">
      <BookingSummary :car="car" :from="from" :to="to" :driver="driver" :total-hours="totalHours" :total-price="totalPrice"/>
    </div>
  </section>
</template>