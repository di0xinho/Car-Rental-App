<script setup lang="ts">
  import { ref } from 'vue';
  const name = ref('');
  const email = ref('');
  const content = ref('');

  function sendMessage() {
    console.log(`Name: ${name.value}, Email: ${email.value}, Content: ${content.value}`);
  }
</script>

<template>
  <form @submit.prevent="sendMessage" class="flex flex-col gap-6 w-full h-full">
    <input type="text" v-model="name" placeholder="Imię i Nazwisko" required class="p-4 border border-neutral-400">
    <input type="email" v-model="email" placeholder="Adres Email" required class="p-4 border border-neutral-400">
    <textarea placeholder="Twoja wiadomość" v-model="content" rows="7" class="p-4 border border-neutral-400 grow-1"></textarea>
    <button type="submit" class="py-3 px-6 bg-dominant-primary self-start hover:cursor-pointer rounded-sm">
      Wyślij Wiadomość
    </button>
  </form>
</template>