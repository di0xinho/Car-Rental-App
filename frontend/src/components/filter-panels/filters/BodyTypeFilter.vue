<script setup lang="ts">
  import { carBodyTypes } from '@/utilities/carModel';
  const type = defineModel('type', {type: Array<string>, required: true});
</script>

<template>
  <h3 class="text-sm text-neutral-600 my-4">TYP</h3>
  <div>
    <div class="my-8" v-for="(carBodyType, index) in carBodyTypes" :key="index">
      <input type="checkbox" v-model="type" :value="carBodyType" :id="carBodyType" class="appearance-none h-5 w-5 align-middle border rounded-md border-neutral-400 checked:border-dominant-primary checked:bg-dominant-primary">
      <label :for="carBodyType" class="ml-3">
        {{ carBodyType.charAt(0).toUpperCase() + carBodyType.slice(1) }}
        <span class="text-neutral-400">(?)</span>
      </label>
    </div>
  </div>
</template>