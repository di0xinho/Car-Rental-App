<script setup lang="ts">
import MileageSvg from '@/components/icons/car-details/MileageSvg.vue';
  defineProps({
    mileage: {type: Number, required: true}
  });
</script>

<template>
  <div class="flex gap-4">
    <dt class="text-sm text-neutral-600">
      <MileageSvg />
    </dt>
    <dd>{{ mileage }}</dd>
  </div>
</template>