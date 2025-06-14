<script setup lang="ts">
  const year = defineModel('year', {type: String, required: true});
  const currentYear = new Date().getFullYear();
</script>

<template>
  <div>
    <input type="range" v-model="year" id="price" :min="currentYear - 10" :max="currentYear" step="1" class="w-full block my-3">
    <label for="price">Min {{ year }} r.</label>
  </div>
</template>