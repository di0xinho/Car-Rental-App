<script setup lang="ts">
  import { ref } from 'vue';
  import useUser from '@/composables/useUser';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const { loginUser } = useUser();

  const email = ref('');
  const password = ref('');
  const rememberMe = ref(false);

  function handleLogin() {
    loginUser(email.value, password.value, rememberMe.value);
    router.push({name: 'home'});
  }
</script>

<template>
  <form @submit.prevent="handleLogin" class="min-w-xs">
    <div class="my-5">
      <label for="email">Adres e-mail</label>
      <input id="email" type="text" v-model="email" placeholder="Wpisz swój adres e-mail" class="block w-full p-2 border border-neutral-400 rounded-lg">
    </div>
    <div class="my-5">
      <div class="flex justify-between items-center">
        <label for="password">Hasło</label>
        <button type="button" class="text-xs cursor-pointer">Zapomniałem hasła</button>
      </div>
      <input id="password" type="password" v-model="password" placeholder="Wpisz hasło" class="block w-full p-2 border border-neutral-400 rounded-lg">
    </div>
    <div class="my-5">
      <input id="remember" type="checkbox" v-model="rememberMe" class="align-middle">
      <label for="remember" class="text-xs ml-2">Zapamiętaj na 30 dni</label>
    </div>
    <button type="submit" class="my-5 w-full p-2 rounded-lg bg-dominant-primary text-center cursor-pointer">
      Zaloguj się
    </button>
  </form>
</template>