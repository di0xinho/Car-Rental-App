<script setup lang="ts">
  const from = defineModel('from', {type: String, required: true});
  const to = defineModel('to', {type: String, required: true});
  const city = defineModel('city', {type: String, required: true});
  const driver = defineModel('driver', {type: Boolean, required: true});
  defineProps({ disabled: {type: Boolean, required: true} });
</script>

<template>
  <form  class="grid grid-cols-1 xs:grid-cols-2 gap-x-8 gap-y-4 sm:gap-y-8">
    <div>
      <label for="from" class="block font-semibold">
        Data rozpoczęcia wynajmu
      </label>
      <input id="from" type="date" v-model="from" class="my-2 sm:my-4 lg:mx-8" :disabled="disabled">
    </div>
    <div>
      <label for="to" class="block font-semibold">
        Data zakończenia wynajmu
      </label>
      <input id="to" type="date" v-model="to" class="my-2 sm:my-4 lg:mx-8" :disabled="disabled">
    </div>
    <div class="col-span-full">
      <label for="city" class="block font-semibold">Miasto</label>
      <select id="city" v-model="city" class="my-2 sm:my-4 lg:mx-8" :disabled="disabled">
        <option disabled value="">Wybierz swoje miasto</option>
        <option>Wrocław</option>
        <option>Warszawa</option>
        <option>Kraków</option>
      </select>
    </div>
    <div class="col-span-full">
      <input type="checkbox" v-model="driver" id="driver" class="my-2 sm:my-4 mr-8" :disabled="disabled">
      <label for="driver">Wynajmij samochód z kierowcą</label>
    </div>
  </form>
</template>