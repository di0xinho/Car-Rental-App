<script setup lang="ts">
  import { carBodyTypes } from '@/utilities/models/carModel';

  const body = defineModel('body', {type: Array<string>, required: true});
  const minCapacity = defineModel('minCapacity', {type: String, required: true});
</script>

<template>
    <form>
      <h3 class="text-xl mt-12">
        Jaki typ nadwozia Cię interesuje ?
      </h3>
      <div class="grid grid-cols-2 lg:grid-cols-3 gap-8 my-8 mx-8">
        <div v-for="(carBodyType, index) in carBodyTypes" :key="index">
          <input type="checkbox" v-model="body" :value="carBodyType" :id="carBodyType" class="appearance-none h-5 w-5 align-middle border rounded-md border-neutral-400 checked:border-dominant-primary checked:bg-dominant-primary">
          <label :for="carBodyType" class="ml-3">
            {{ carBodyType.charAt(0).toUpperCase() + carBodyType.slice(1) }}
            <span class="text-neutral-400">(?)</span>
          </label>
        </div>
      </div>
      <h3 class="text-xl mt-12">
        Wybierz preferowaną ilość miejsc w samochodzie.
      </h3>
      <div class="grid grid-cols-2 gap-8 my-8 mx-8">
        <div>
          <input type="radio" id="capacity-two" value="2" v-model="minCapacity">
          <label for="capacity-two" class="ml-3">2 osoby</label>
        </div>
        <div>
          <input type="radio" id="capacity-four" value="4" v-model="minCapacity">
          <label for="capacity-four" class="ml-3">4 osoby</label>
        </div>
        <div>
          <input type="radio" id="capacity-five" value="5" v-model="minCapacity">
          <label for="capacity-five" class="ml-3">5 osób</label>
        </div>
        <div>
          <input type="radio" id="capacity-more" value="6" v-model="minCapacity">
          <label for="capacity-five" class="ml-3">6 osób</label>
        </div>
      </div>
    </form>
</template>