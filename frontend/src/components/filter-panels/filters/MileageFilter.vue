<script setup lang="ts">
  const mileage = defineModel('mileage', {type: String, required: true});
</script>

<template>
  <div>
    <input type="range" v-model="mileage" id="mileage" min="50000" max="300000" step="10000" class="w-full block my-3">
    <label for="mileage">Max {{ mileage }} km</label>
  </div>
</template>