<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { carMakers } from '@/utilities/models/carModel';

  const maker = defineModel('maker', {type: Array<string>, required: true});

  const label = computed(() => {
    if (maker.value.length > 0) {
      return maker.value.toString();
    } else {
      return 'Wybierz markę samochodu';
    }
  });  

  const openOptions = ref(false);
</script>

<template>
  <div class="relative bg-light-bg group text-black">
    <button @click="openOptions = !openOptions" class="w-full flex gap-4 items-center justify-between p-4">
      <span class="max-w-[calc(100%_-_36px)] truncate">
        {{ label }}
      </span>
      <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg" :class="{'rotate-180': openOptions}">
        <path d="M1 3L10 13L19 3" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <div class="absolute w-full group-hover:block bg-light-bg z-20" :class="{ hidden: !openOptions }">
      <div class="m-8" v-for="(carMaker, index) in carMakers" :key="index">
        <input type="checkbox" v-model="maker" :value="carMaker" :id="carMaker" class="appearance-none h-5 w-5 align-middle border rounded-md border-neutral-400 checked:border-dominant-primary checked:bg-dominant-primary">
        <label :for="carMaker" class="ml-3">{{ carMaker }}</label>
      </div>
    </div>
  </div>
</template>