<script setup lang="ts">
  import YearSvg from '@/components/icons/car-details/YearSvg.vue';
  defineProps({
    year: {type: Number, required: true}
  });
</script>

<template>
  <div class="flex gap-4">
    <dt class="text-sm text-neutral-600">
      <YearSvg />
    </dt>
    <dd>{{ year }}</dd>
  </div>
</template>