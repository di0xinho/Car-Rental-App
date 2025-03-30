<script setup lang="ts">
  const capacity = defineModel('capacity', {type: String, required: true});
</script>

<template>
  <h3 class="text-sm text-neutral-600 my-4">ILOŚĆ MIEJSC</h3>
  <div>
    <div class="my-8">
      <input type="radio" id="capacity-two" value="2" v-model="capacity">
      <label for="capacity-two" class="ml-3">2 osoby</label>
    </div>
    <div class="my-8">
      <input type="radio" id="capacity-four" value="4" v-model="capacity">
      <label for="capacity-four" class="ml-3">4 osoby</label>
    </div>
    <div class="my-8">
      <input type="radio" id="capacity-five" value="5" v-model="capacity">
      <label for="capacity-five" class="ml-3">5 osób</label>
    </div>
    <div class="my-8">
      <input type="radio" id="capacity-more" value="6" v-model="capacity">
      <label for="capacity-five" class="ml-3">6 osób</label>
    </div>
  </div>
</template>