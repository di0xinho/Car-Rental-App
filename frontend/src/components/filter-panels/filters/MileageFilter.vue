<script setup lang="ts">
  const mileage = defineModel('mileage', {type: String, required: true});
</script>

<template>
  <h3 class="text-sm text-neutral-600 my-4">PRZEBIEG</h3>
  <div class="my-8">
    <input type="range" v-model="mileage" id="mileage" min="50000" max="250000" step="10000" class="block my-3">
    <label for="mileage">Max {{ mileage }} km</label>
  </div>
</template>