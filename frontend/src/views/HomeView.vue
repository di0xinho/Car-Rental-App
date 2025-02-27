<script setup lang="ts">
  import CarsCollection from '@/components/cars-collection/CarsCollection.vue';
  import CompanyValues from '@/components/company-values/CompanyValues.vue';
  import CustomerOpinions from '@/components/customers_opinions/CustomerOpinions.vue';
  import MobileAppBanner from '@/components/banners/MobileAppBanner.vue';
  import DiscountBanner from '@/components/banners/DiscountBanner.vue';
  import ContactForm from '@/components/contact-form/ContactForm.vue';
  import { Car } from '@/utilities/carModel';

  // Mocking cars data:
  import json from '../../../mock_data/db.json';
  const cars = json['get-all-cars'].data.slice(0, 6) as Car[];
</script>

<template>
  <section>
    <CompanyValues />
  </section>
  <section id="cars">
    <CarsCollection :cars="cars"/>
  </section>
  <section class="mx-8 my-15">
    <h3 class="text-5xl text-center my-10">Opinie naszych klientów</h3>
    <CustomerOpinions />
  </section>
  <section class="mb-27 mt-58 mx-8">
    <MobileAppBanner />
  </section>
  <section class="my-15 mx-8">
    <DiscountBanner />
  </section>
  <section class="flex my-15 mx-8 justify-around">
    <div class="w-md">
      <ContactForm />
    </div>
    <img src="/images/common/car-keys.webp" alt="car keys" class="w-120">
  </section>
</template>