<script setup lang="ts">
  defineProps({
    title: {type: String, required: true},
    image: {type: String, required: true},
  });
</script>

<template>
  <div class="text-center">
    <img :src="image" alt="icon" class="w-20 mx-auto">
    <h5 class="text-3xl">{{ title }}</h5>
    <p>
      <slot/>
    </p>
  </div>
</template>