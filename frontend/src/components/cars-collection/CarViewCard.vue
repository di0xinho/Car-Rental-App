<script setup lang="ts">
  import { RouterLink } from 'vue-router';

  defineProps({
    id: {type: [String, Number], required: true},
    model: {type: String, required: true},
    index: {type: Number, required: true},
  });
</script>

<template>
  <section class="flex flex-col bg-neutral-100 rounded-medium overflow-hidden">
    <img 
      :src="`/cars/car_img_placeholder_${(index % 2) + 1}.svg`"
      alt="car in our offer"
      class="w-full"
    >
    <div class="flex justify-between m-4">
      <div>
        <h5>{{ model }}</h5>
        <h6>typ samochodu</h6>
      </div>
      <div>
        <h5>0.00 PLN</h5>
        <h6>/za dzień</h6>
      </div>
    </div>
    <div class="flex justify-between mx-4">
      <div>
        <h6>Automat</h6>
      </div>
      <div>
        <h6>PB 95</h6>
      </div>
      <div>
        <h6>Klimatyzacja</h6>
      </div>
    </div>
    <RouterLink :to="{name: 'cars-model', params: {model: id}}" class="m-4 p-2 rounded-lg bg-dominant-primary text-center">
      Zobacz szczegóły
    </RouterLink>
  </section>
</template>