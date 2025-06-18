<script setup lang="ts">
import GearboxSvg from '@/components/icons/car-details/GearboxSvg.vue';
  defineProps({
    gearboxType: {type: String, required: true}
  });
</script>

<template>
  <div class="flex gap-4">
    <dt class="text-sm text-neutral-600">
      <GearboxSvg />
    </dt>
    <dd>{{ gearboxType }}</dd>
  </div>
</template>