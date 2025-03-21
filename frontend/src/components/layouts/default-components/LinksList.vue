<script setup lang="ts">
  defineProps({
    title: {type: String, required: true},
  });
</script>

<template>
  <div>
    <h4 class="text-3xl font-dm-serif">
      {{ title }}
    </h4>
    <ul class="text-2xl font-light my-8 *:my-4">
      <slot/>
    </ul>
  </div>
</template>