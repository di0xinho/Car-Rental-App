<script setup lang="ts">
import FuelSvg from '@/components/icons/car-details/FuelSvg.vue';
  defineProps({
    fuelType: {type: String, required: true}
  });
</script>

<template>
  <div class="flex gap-4">
    <dt class="text-sm text-neutral-600">
      <FuelSvg />
    </dt>
    <dd>{{ fuelType }}</dd>
  </div>
</template>