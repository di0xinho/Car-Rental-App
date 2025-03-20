<script setup lang="ts">
  const gearbox = defineModel('gearbox', {type: String, required: true});
</script>

<template>
  <h3 class="text-sm text-neutral-600 my-4">SKRZYNIA BIEGÓW</h3>
  <div>
    <div class="my-8">
      <input type="radio" id="manual" value="manual" v-model="gearbox">
      <label for="manual" class="ml-3">
        Manualna
      </label>
    </div>
    <div class="my-8">
      <input type="radio" id="automatic" value="automatic" v-model="gearbox">
      <label for="automatic" class="ml-3">
        Automatyczna
      </label>
    </div>
  </div>
</template>