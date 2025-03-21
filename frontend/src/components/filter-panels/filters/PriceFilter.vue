<script setup lang="ts">
  const price = defineModel('price', {type: String, required: true});
</script>

<template>
    <h3 class="text-sm text-neutral-600 my-4">CENA</h3>
    <div class="my-8">
      <input type="range" v-model="price" id="price" min="0" max="1000" step="50" class="block my-3">
      <label for="price">Max {{ price }} zł</label>
    </div>
</template>