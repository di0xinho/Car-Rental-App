<script setup lang="ts">
  const from = defineModel('from', {type: String, required: true});
  const to = defineModel('to', {type: String, required: true});
  const city = defineModel('city', {type: String, required: true});
  const driver = defineModel('driver', {type: Boolean, required: true});
  defineEmits(['accept']);
</script>

<template>
  <form @submit.prevent="$emit('accept')" class="grid grid-cols-2 gap-8">
    <div>
      <label for="from" class="block font-semibold">
        Data rozpoczęcia wynajmu
      </label>
      <input id="from" type="date" v-model="from" class="my-4 mx-8">
    </div>
    <div>
      <label for="to" class="block font-semibold">
        Data zakończenia wynajmu
      </label>
      <input id="to" type="date" v-model="to" class="my-4 mx-8">
    </div>
    <div>
      <label for="city" class="block font-semibold">Miasto</label>
      <select id="city" v-model="city" class="my-4 mx-8">
        <option disabled value="">Wybierz swoje miasto</option>
        <option>Wrocław</option>
        <option>Warszawa</option>
        <option>Kraków</option>
      </select>
    </div>
    <div class="self-end col-start-1">
      <input type="checkbox" v-model="driver" id="driver" class="my-4 mr-8">
      <label for="driver">Wynajmij samochód z kierowcą</label>
    </div>
    <button type="submit" class="btn col-span-full justify-self-end">
      Zaakceptuj i zapłać
    </button>
  </form>
</template>