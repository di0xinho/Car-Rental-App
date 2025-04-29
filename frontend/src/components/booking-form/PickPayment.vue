<script setup lang="ts">
  const payment = defineModel('payment', {type: String, required: true});
  defineProps({
    disabled: {type: Boolean, required: true}
  });
</script>

<template>
  <form class="w-full flex justify-around">
    <div>
      <input type="radio" id="stripe" value="stripe" v-model="payment" :disabled="disabled" class="my-4 mx-8">
      <label for="stripe">Zapłać online</label>
    </div>
    <div>
      <input type="radio" id="on-the-spot" value="on-the-spot" v-model="payment" :disabled="disabled" class="my-4 mx-8">
      <label for="on-the-spot">Zapłać na miejscu</label>
    </div>
  </form>
</template>