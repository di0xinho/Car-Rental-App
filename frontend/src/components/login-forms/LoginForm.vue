<script setup lang="ts">
  import { ref } from 'vue';
  import useUser from '@/composables/useUser';
  import { useRouter } from 'vue-router';

  const emit = defineEmits({
    showMessage: (message: {success: boolean, message: string}) => {}
  });

  const router = useRouter();
  const { logInUser } = useUser();

  const email = ref('');
  const password = ref('');
  const rememberMe = ref(false);

  async function handleLogIn() {
    try {
      const result = await logInUser(email.value, password.value);
      if (result.success) {
        console.log(result.message);
        console.log(result.data);
        router.push({name: 'home'});
      }
    } catch (error) {
      if (error instanceof Error) {
        emit('showMessage', {success: false, message: error.message});
      }
    }
  }
</script>

<template>
  <form @submit.prevent="handleLogIn" class="min-w-xs">
    <div class="my-5">
      <label for="email">Adres e-mail</label>
      <input id="email" type="text" v-model="email" placeholder="Wpisz swój adres e-mail" class="input">
    </div>
    <div class="my-5">
      <div class="flex justify-between items-center">
        <label for="password">Hasło</label>
        <button type="button" class="text-xs cursor-pointer">Zapomniałem hasła</button>
      </div>
      <input id="password" type="password" v-model="password" placeholder="Wpisz hasło" class="input">
    </div>
    <div class="my-5">
      <input id="remember" type="checkbox" v-model="rememberMe" class="align-middle">
      <label for="remember" class="text-xs ml-2">Zapamiętaj na 30 dni</label>
    </div>
    <button type="submit" class="my-5 w-full btn">
      Zaloguj się
    </button>
  </form>
</template>