<script setup lang="ts">
  import { fuelTypes } from '@/utilities/models/carModel';

  const fuel = defineModel('fuel', {type: String, required: true});
  const gearbox = defineModel('gearbox', {type: String, required: true});
</script>

<template>
  <form>
    <h3 class="text-xl mt-12">
      Wybierz preferowany rodzaj paliwa.
    </h3>
    <div class="grid grid-cols-2 lg:grid-cols-3 gap-8 my-8 mx-8">
      <div v-for="(fuelType, index) in fuelTypes" :key="index">
        <input type="radio" :id="fuelType" :value="fuelType.toLowerCase()" v-model="fuel">
        <label :for="fuelType" class="ml-3">{{ fuelType }}</label>
      </div>
    </div>
    <h3 class="text-xl mt-12">
      Preferujesz samochód z automatyczną skrzynią biegów, czy z manualną ?
    </h3>
    <div class="grid grid-cols-2 gap-8 my-8 mx-8">
      <div>
        <input type="radio" id="manual" value="manual" v-model="gearbox">
        <label for="manual" class="ml-3">Manualna</label>
      </div>
      <div>
        <input type="radio" id="automatic" value="automatic" v-model="gearbox">
        <label for="automatic" class="ml-3">Automatyczna</label>
      </div>
    </div>
  </form>
</template>