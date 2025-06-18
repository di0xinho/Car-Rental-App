<script setup lang="ts">
  const year = defineModel('year', {type: String, required: true});
  const mileage = defineModel('mileage', {type: String, required: true});
  const price = defineModel('price', {type: String, required: true});
  
  const currentYear = new Date().getFullYear();
</script>

<template>
  <form>
    <h3 class="pref-wiz-header">
      Podaj maksymalny rocznik auta.
    </h3>
    <div class="flex flex-col md:flex-row lg:mx-8 my-4 xs:my-6 md:my-8 gap-y-1 gap-x-8 lg:gap-x-12">
      <input type="range" v-model="year" id="price" :min="currentYear - 10" :max="currentYear" step="1" class="basis-1/2">
      <label for="price">Auto nie starsze niż {{ year }} r.</label>
    </div>
    <h3 class="pref-wiz-header">
      Podaj maksymalny przebieg auta.
    </h3>
    <div class="flex flex-col md:flex-row lg:mx-8 my-4 xs:my-6 md:my-8 gap-y-1 gap-x-8 lg:gap-x-12">
      <input type="range" v-model="mileage" id="mileage" min="50000" max="300000" step="10000" class="basis-1/2">
      <label for="mileage">Maks. przebieg: {{ mileage }} km</label>
    </div>
    <h3 class="pref-wiz-header">
      Podaj maksymalną cenę za godzinę wynajmu.
    </h3>
    <div class="flex flex-col md:flex-row lg:mx-8 my-4 xs:my-6 md:my-8 gap-y-1 gap-x-8 lg:gap-x-12">
      <input type="range" v-model="price" id="price" min="0" max="120" step="10" class="basis-1/2">
      <label for="price">Maksymalna cena: {{ price }} zł/godz.</label>
    </div>
  </form>
</template>