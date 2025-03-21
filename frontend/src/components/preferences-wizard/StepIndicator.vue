<script setup lang="ts">
import { computed } from 'vue';

  const props = defineProps({
    step: {type: Number, required: true}
  })

  const previousStep = 'bg-dominant-secondary';
  const activeStep = 'scale-120 bg-dominant-primary';
  const nextStep = 'bg-neutral-200';
</script>

<template>
  <div class="flex items-center text-base/4">
    <span class="p-3 min-w-10 text-center h-10 rounded-full mr-6" :class="{[previousStep]: step > 1, [activeStep]: step === 1}">
      1
    </span>
    <svg viewBox="0 0 100 2" xmlns="http://www.w3.org/2000/svg">
      <line y1="1" x2="100" y2="1" stroke="#E5E5E5" stroke-width="2" vector-effect="non-scaling-stroke"/>
    </svg>
    <span class="p-3 min-w-10 text-center h-10 rounded-full mx-6" :class="{[previousStep]: step > 2, [activeStep]: step === 2, [nextStep]: step < 2}">
      2
    </span>
    <svg viewBox="0 0 100 2" xmlns="http://www.w3.org/2000/svg">
      <line y1="1" x2="100" y2="1" stroke="#E5E5E5" stroke-width="2" vector-effect="non-scaling-stroke"/>
    </svg>
    <span class="p-3 min-w-10 text-center h-10 rounded-full ml-6" :class="{[activeStep]: step === 3, [nextStep]: step < 3}">
      3
    </span>
  </div>
</template>