<script setup lang="ts">

  const city = defineModel('city', {type: String, required: true });
  const dateFrom= defineModel('dateFrom', {type: String, required: true});
  const dateTo= defineModel('dateTo', {type: String, required: true});

</script>

<template>
  <form class="flex bg-layout-primary p-8">
    <div class="pr-8">
      <label for="city" class="block font-semibold">
        Miejsce
      </label>
      <select id="city" v-model="city">
        <option disabled value="">Wybierz swoje miasto</option>
        <option>Wrocław</option>
        <option>Warszawa</option>
        <option>Kraków</option>
      </select>
    </div>
    <div class="px-8 border-x">
      <label for="from" class="block font-semibold">
        Data wynajmu
      </label>
      <input id="from" type="date" v-model="dateFrom">
    </div>
    <div class="pl-8">
      <label for="to" class="block font-semibold">
        Data powrotu
      </label>
      <input id="to" type="date" v-model="dateTo">
    </div>
  </form>
</template>