<script setup lang="ts">
  const minCapacity = defineModel('minCapacity', {type: String, required: true});
</script>

<template>
  <div>
    <div class="my-8">
      <input type="radio" id="capacity-two" value="2" v-model="minCapacity">
      <label for="capacity-two" class="ml-3">2 osoby</label>
    </div>
    <div class="my-8">
      <input type="radio" id="capacity-four" value="4" v-model="minCapacity">
      <label for="capacity-four" class="ml-3">4 osoby</label>
    </div>
    <div class="my-8">
      <input type="radio" id="capacity-five" value="5" v-model="minCapacity">
      <label for="capacity-five" class="ml-3">5 osób</label>
    </div>
    <div class="my-8">
      <input type="radio" id="capacity-more" value="6" v-model="minCapacity">
      <label for="capacity-five" class="ml-3">6 osób</label>
    </div>
  </div>
</template>