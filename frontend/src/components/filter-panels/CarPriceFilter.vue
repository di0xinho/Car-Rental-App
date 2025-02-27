<script setup lang="ts">
  const type = defineModel('type', {type: Array<string>, required: true});
  const price = defineModel('price', {type: String, required: true});

  const carTypes = ['sport', 'suv', 'mpv', 'sedan', 'coupe', 'chatchback']
</script>

<template>
  <div class="p-8">
    <h3>TYP</h3>
    <form>
      <div class="my-8" v-for="(carType, index) in carTypes">
        <input type="checkbox" v-model="type" :value="carType" :id="carType" class="appearance-none h-5 w-5 align-middle border rounded-md border-neutral-400 checked:border-dominant-primary checked:bg-dominant-primary">
        <label :for="carType" class="ml-3">
          {{ carType.charAt(0).toUpperCase() + carType.slice(1) }}
          <span class="text-neutral-400">(?)</span>
        </label>
      </div>
    </form>
    <h3 class="mb-8 mt-16">CENA</h3>
    <form>
      <input type="range" v-model="price" id="price" min="0" max="1000" step="50" class="block my-3">
      <label for="price">Max {{ price }} zł</label>
    </form>
  </div>
</template>