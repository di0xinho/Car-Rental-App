<script setup lang="ts">
  import { carMakers, fuelTypes, carBodyTypes, carColors } from '@/utilities/models/carModel';

  const make = defineModel('make', {type: String, required: true});
  const model = defineModel('model', {type: String, required: true});
  const capacity = defineModel('capacity', {type: Number});
  const year = defineModel('year', {type: Number});
  const color = defineModel('color', {type: String, required: true});
  const bodyType = defineModel('bodyType', {type: String, required: true});
  const gearboxType = defineModel('gearboxType', {type: String, required: true});
  const mileage = defineModel('mileage', {type: Number});
  const fuelType = defineModel('fuelType', {type: String, required: true});
  const hourlyPrice = defineModel('hourlyPrice', {type: Number});
  const imageUrl = defineModel('imageUrl', {type: String, required: true});
  const description = defineModel('description', {type: String, required: true});

  const currentYear = new Date().getFullYear();
</script>

<template>
  <form class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div>
      <h3 class="text-sm text-neutral-600 my-4">MARKA</h3>
      <select name="make" v-model="make" required class="w-full px-4 py-2 outline-none bg-light-bg">
        <option value="" disabled>--Wybierz markę samochodu--</option>
        <option v-for="(maker, index) in carMakers" :key="index" :value="maker">
          {{ maker }}
        </option>
      </select>
    </div>
    <div>
      <h3 class="text-sm text-neutral-600 my-4">MODEL</h3>
      <input type="text" name="model" v-model="model" placeholder="--Podaj model samochodu--" required class="w-full px-4 py-2 outline-none bg-light-bg">
    </div>
    <div>
      <h3 class="text-sm text-neutral-600 my-4">TYP</h3>
      <select name="body-type" v-model="bodyType" required class="w-full px-4 py-2 outline-none bg-light-bg">
        <option value="" disabled>--Wybierz typ nadwozia--</option>
        <option v-for="bodyType in carBodyTypes" :value="bodyType">{{ bodyType }}</option>
      </select>
    </div>
    <div>
      <h3 class="text-sm text-neutral-600 my-4">SKRZYNIA BIEGÓW</h3>
      <div class="w-full px-4 py-2">
        <input name="gearbox-type" type="radio" v-model="gearboxType" id="manualna" value="Manualna" required class="mr-2">
        <label for="manualna" class="mr-6">Manualna</label>
        <input name="gearbox-type" type="radio" v-model="gearboxType" id="automatyczna" value="Automatyczna" required class="mr-2">
        <label for="automatyczna">Automatyczna</label>
      </div>
    </div>
    <div>
      <h3 class="text-sm text-neutral-600 my-4">RODZAJ PALIWA</h3>
      <select name="fuel-type" v-model="fuelType" required class="w-full px-4 py-2 outline-none bg-light-bg">
        <option value="" disabled>--Wybierz rodzaj paliwa--</option>
        <option v-for="fuelType in fuelTypes" :value="fuelType">{{ fuelType }}</option>
      </select>
    </div>
    <div>
      <h3 class="text-sm text-neutral-600 my-4">KOLOR</h3>
      <select name="color" v-model="color" required class="w-full px-4 py-2 outline-none bg-light-bg">
        <option value="" disabled>--Wybierz kolor karoserii--</option>
        <option v-for="color in carColors" :value="color">{{ color }}</option>
      </select>
    </div>
    <div>
      <h3 class="text-sm text-neutral-600 my-4">ILOŚĆ MIEJSC</h3>
      <input type="number" name="capacity" min="1" max="9" v-model="capacity" placeholder="--Podaj ilość miejsc--" required class="w-full px-4 py-2 outline-none bg-light-bg">
    </div>
    <div>
      <h3 class="text-sm text-neutral-600 my-4">ROCZNIK</h3>
      <select name="year" v-model="year" required class="w-full px-4 py-2 outline-none bg-light-bg">
        <option value="" disabled>--Wybierz rok produkcji--</option>
        <option :value="currentYear">{{ currentYear }}</option>
        <option v-for="n in 9" :value="currentYear - n">{{ currentYear - n }}</option>
      </select>
    </div>
    <div>
      <h3 class="text-sm text-neutral-600 my-4">PRZEBIEG (KM)</h3>
      <input type="number" name="mileage" v-model="mileage" min="0" max="500000" placeholder="--Podaj przebieg samochodu--" required class="w-full px-4 py-2 outline-none bg-light-bg">
    </div>
    <div>
      <h3 class="text-sm text-neutral-600 my-4">CENA (ZŁ/godzinę)</h3>
      <input type="number" name="hourly-price" min="0" max="200" v-model="hourlyPrice" placeholder="--Podaj stawkę godzinową--" class="w-full px-4 py-2 outline-none bg-light-bg">
    </div>
    <div class="md:col-span-2">
      <h3 class="text-sm text-neutral-600 my-4">ZDJĘCIE (LINK)</h3>
      <input type="url" name="image-url" v-model="imageUrl" placeholder="--Podaj adres URL zdjęcia--" pattern="https://.*" class="w-full px-4 py-2 outline-none bg-light-bg">
    </div>
    <div class="col-span-full">
      <h3 class="text-sm text-neutral-600 my-4">OPIS</h3>
      <textarea name="description" v-model="description" rows="10" required class="w-full px-4 py-2 outline-none bg-light-bg"></textarea>
    </div>
  </form>
</template>