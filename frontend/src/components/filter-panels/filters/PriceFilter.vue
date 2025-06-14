<script setup lang="ts">
  const price = defineModel('price', {type: String, required: true});
</script>

<template>
    <div>
      <input type="range" v-model="price" id="price" min="0" max="120" step="10" class="w-full block my-3">
      <label for="price">Max {{ price }} zł</label>
    </div>
</template> 