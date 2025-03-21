<script setup lang="ts">
  import { ref } from 'vue';

  const name = ref('');
  const email = ref('');
  const password = ref('');
  const acceptPolicy = ref(false);

  function signinUser() {
    console.log(`Signing in user! Name: ${name.value} Email: ${email.value}, Password: ${password.value}, accepted policy: ${acceptPolicy.value}`);
  }
</script>

<template>
  <form @submit.prevent="signinUser" class="min-w-xs">
    <div class="my-5">
      <label for="name">Imię i Nazwisko</label>
      <input id="email" type="text" v-model="name" placeholder="Wpisz swoje Imię i Nazwisko" class="block w-full p-2 border border-neutral-400 rounded-lg">
    </div>
    <div class="my-5">
      <label for="email">Adres e-mail</label>
      <input id="email" type="text" v-model="email" placeholder="Wpisz swój adres e-mail" class="block w-full p-2 border border-neutral-400 rounded-lg">
    </div>
    <div class="my-5">
      <label for="password">Hasło</label>
      <input id="password" type="password" v-model="password" placeholder="Wpisz hasło" class="block w-full p-2 border border-neutral-400 rounded-lg">
    </div>
    <div class="my-5">
      <input id="accept-policy" type="checkbox" v-model="acceptPolicy" required class="align-middle">
      <label for="accept-policy" class="text-xs ml-2">
        Zgadzam się z regulaminem i polityką firmy
      </label>
    </div>
    <button type="submit" class="my-5 w-full p-2 rounded-lg bg-dominant-primary text-center cursor-pointer">
      Zarejestruj się
    </button>
  </form>
</template>