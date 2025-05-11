<script setup lang="ts">
  const city = defineModel('city', {type: String, required: true});
  const dateFrom= defineModel('dateFrom', {type: String, required: true});
  const dateTo= defineModel('dateTo', {type: String, required: true});
</script>

<template>
  <form class="flex flex-col lg:flex-row gap-y-3">
    <div class="flex gap-x-6 lg:flex-col justify-between lg:pr-8">
      <label for="city" class="font-semibold">
        Miejsce
      </label>
      <select id="city" v-model="city" class="w-36">
        <option disabled value="">Wybierz miasto</option>
        <option>Wrocław</option>
        <option>Warszawa</option>
        <option>Kraków</option>
      </select>
    </div>
    <hr class="lg:hidden">
    <div class="flex gap-x-6 lg:flex-col justify-between lg:px-8 lg:border-x">
      <label for="from" class="font-semibold">
        Data wynajmu
      </label>
      <input id="from" type="date" v-model="dateFrom" class="w-36">
    </div>
    <hr class="lg:hidden">
    <div class="flex gap-x-6 lg:flex-col justify-between lg:pl-8">
      <label for="to" class="font-semibold">
        Data powrotu
      </label>
      <input id="to" type="date" v-model="dateTo" class="w-36">
    </div>
  </form>
</template>