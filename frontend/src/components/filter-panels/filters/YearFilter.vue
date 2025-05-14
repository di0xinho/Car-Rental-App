<script setup lang="ts">
  const year = defineModel('year', {type: String, required: true});
  const currentYear = new Date().getFullYear();
</script>

<template>
  <h3 class="text-sm text-neutral-600 mb-4">ROCZNIK</h3>
  <div class="my-8">
    <input type="range" v-model="year" id="price" :min="currentYear - 10" :max="currentYear" step="1" class="block my-3">
    <label for="price">Min {{ year }} r.</label>
  </div>
</template>