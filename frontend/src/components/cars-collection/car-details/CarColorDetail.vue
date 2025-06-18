<script setup lang="ts">
  import ColorSvg from '@/components/icons/car-details/ColorSvg.vue';
  defineProps({
    color: {type: String, required: true}
  });
</script>

<template>
  <div class="flex gap-4">
    <dt class="text-sm text-neutral-600">
      <ColorSvg />
    </dt>
    <dd>{{ color }}</dd>
  </div>
</template>