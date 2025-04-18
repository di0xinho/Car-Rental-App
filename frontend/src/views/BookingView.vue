<script setup lang="ts">
  import UserDetails from '@/components/booking-form/UserDetails.vue';
  import BookingDetailsForm from '@/components/booking-form/BookingDetailsForm.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { onMounted, ref, computed, watch } from 'vue';
  import { Car } from '@/utilities/models/carModel';
  import useUser from '@/composables/useUser';
  import useStripePayments from '@/composables/useStripePayments';

  const route = useRoute();
  const router = useRouter();

  const from = ref<string>(route.query.from as string);
  const to = ref<string>(route.query.to as string);
  const city = ref<string>(route.query.city as string);
  const driver = ref<boolean>(false);
  const car = ref<Car|null>(null);

  const step = ref<'check'|'pay'>('check');

  const hoursTotal = computed(() => {
    const fromTimestamp =  Date.parse(from.value);
    const toTimestamp =  Date.parse(to.value);
    return (toTimestamp - fromTimestamp) / 3600000;
  });

  const totalPrice = computed(() => {
    return hoursTotal.value * car.value!.hourlyPrice;
  });

  watch([from, to, city], ([newFrom, newTo, newCity]) => {
    router.replace({name: 'booking', query: {car_id: car.value!._id, from: newFrom, to: newTo, city: newCity}});
  })

  const { user } = useUser();

  const { stripe, checkout, paymentElement, initializeStripe, requestCheckoutSession, renderPaymentForm, confirmPayment } = useStripePayments();

  // Mocking cars data
  import json from '../../../mock_data/db.json';
  const cars = json['get-all-cars'].data as Car[];
  // const searchCar = cars.find(car => car._id === route.query.car_id);
  const searchCar = cars.find(car => car._id === '67b35c8ef7ab3c470454c1ff');
  if (searchCar) {
    car.value = searchCar;
  } else {
    router.replace({name: 'not-found'})
  }

  // Loading Srtipe.js and initializing 
  initializeStripe();

  async function confirmOrderDetails() {
    try {
      step.value = 'pay';
      // Request for new checkout session
      await requestCheckoutSession('carId', 'from', 'to', 'city', 24, 1000, true);
      renderPaymentForm();
    } catch(error) {
      console.error(error);
    }
  }

  async function pay() {
    try {
      confirmPayment();
    } catch(error) {
      console.error(error);
    }
  }
</script>

<template>
  <section class="flex gap-8 m-8">
    <div class="grow-1">
      <div class="p-6">
        <h3 class="text-xl font-semibold">Dane użytkownika</h3>
        <h4 class="text-sm text-neutral-500">
          Podane dane użytkownika zostaną użyte w procesie płatności<br>
          (dane użytkownika możesz zmienić w panelu użytkownika w zakładce ustawienia).
        </h4>
        <div class="mt-8">
          <UserDetails />
        </div>
      </div>
      <div v-if="step === 'check'" class="p-6 mt-8">
        <h3 class="text-xl font-semibold">Rezerwacja</h3>
        <h4 class="text-sm text-neutral-500">
          Uzupełnij dane dotyczące rezerwacji.
        </h4>
        <div class="mt-8">
          <BookingDetailsForm v-model:from="from" v-model:to="to" v-model:city="city" v-model:driver="driver" @accept="confirmOrderDetails"/>
        </div>
      </div>
      <div v-if="step === 'pay'" class="p-6">
        <h3 class="text-xl font-semibold">Płatność</h3>
        <h4 class="text-sm text-neutral-500">
          Uzupełnij dane dotyczące płatności online.
        </h4>
        <form id="payment-form" @submit.prevent="pay">
          <div id="payment-element">
            <!--Stripe.js injects the Payment Element-->
          </div>
          <button type="submit" class="btn">Zapłać</button>
          <div id="payment-message" class="hidden"></div>
        </form>
      </div>
    </div>
    <!-- Podsumowanie -->
    <div class="basis-2/5 p-6">
      <h3 class="text-xl font-semibold">Podsumowanie zamówienia</h3>
      <div class="flex items-center gap-6 my-8">
        <img :src="`/cars/${car!.imageUrl}`" alt="Selected car model" class="w-2/5 bg-dominant-primary rounded-lg">
        <h4 class="text-3xl font-semibold">{{ car!.make + ' ' + car!.model }}</h4>
      </div>
      <hr class="my-8 border-neutral-500">
      <table class="w-full">
        <tbody>
          <tr>
            <th scope="row" class="text-left py-3 font-normal text-neutral-500">
              Cena za godzinę
            </th>
            <td class="text-right py-3 font-medium">{{ car!.hourlyPrice }} PLN</td>
          </tr>
          <tr>
            <th scope="row" class="text-left py-3 font-normal text-neutral-500">
              Data
            </th>
            <td class="text-right py-3 font-medium">od {{ from }} do {{ to }}</td>
          </tr>
          <tr>
            <th scope="row" class="text-left py-3 font-normal text-neutral-500">
              Ilość godzin
            </th>
            <td class="text-right py-3 font-medium">{{ hoursTotal }}</td>
          </tr>
          <tr>
            <th scope="row" class="text-left py-3 font-normal text-neutral-500">
              Samochód z kierowcą
            </th>
            <td class="text-right py-3 font-medium">{{ driver ? 'Tak' : 'Nie' }}</td>
          </tr>
          <tr>
            <th scope="row" class="text-left pt-8 pb-3 text-xl font-semibold">
              Cena całkowita
            </th>
            <td class="text-right pt-8 pb-3 text-3xl font-semibold">{{ totalPrice }} PLN</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>