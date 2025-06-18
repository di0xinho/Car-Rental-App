<script setup lang="ts">
  import CapacitySvg from '@/components/icons/car-details/CapacitySvg.vue';
  defineProps({
    capacity: {type: Number, required: true}
  });
</script>

<template>
  <div class="flex gap-4">
    <dt class="text-sm text-neutral-600">
      <CapacitySvg />
    </dt>
    <dd>{{ capacity }} {{ capacity < 5 ? "Osoby" : "Osób" }}</dd>
  </div>
</template>