<script setup lang="ts">
  const year = defineModel('year', {type: String, required: true});
  const mileage = defineModel('mileage', {type: String, required: true});
  const price = defineModel('price', {type: String, required: true});
  
  const currentYear = new Date().getFullYear();
</script>

<template>
  <form>
    <h3 class="text-xl mt-12">
      Podaj maksymalny rocznik auta.
    </h3>
    <div class="flex my-8 gap-10">
      <input type="range" v-model="year" id="price" :min="currentYear - 10" :max="currentYear" step="1" class="basis-1/2">
      <label for="price">Auto nie starsze niż {{ year }} r.</label>
    </div>
    <h3 class="text-xl mt-12">
      Podaj maksymalny przebieg auta.
    </h3>
    <div class="flex my-8 gap-10">
      <input type="range" v-model="mileage" id="mileage" min="50000" max="200000" step="10000" class="basis-1/2">
      <label for="mileage">Maxymalny przebieg: {{ mileage }} km</label>
    </div>
    <h3 class="text-xl mt-12">
      Podaj maksymalną cenę za dzień/godzinę wynajmu.
    </h3>
    <div class="flex my-8 gap-10">
      <input type="range" v-model="price" id="price" min="0" max="1000" step="50" class="basis-1/2">
      <label for="price">Maksymalna stawka za dzień/godzinę wynajmu: {{ price }} zł</label>
    </div>
  </form>
</template>