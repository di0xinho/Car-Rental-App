<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import useUser from '@/composables/useUser';

  const emit = defineEmits({
    showMessage: (message: {success: boolean, message: string}) => {}
  });
  // TODO: validation of fields
  const validationErrors = reactive({
    username: null,
    email: null,
    password: null
  });

  const router = useRouter();
  const { signInNewUser } = useUser();

  const username = ref('');
  const email = ref('');
  const password = ref('');
  const acceptPolicy = ref(false);

  async function handleSignIn() {
    try {
      const result = await signInNewUser(username.value, email.value, password.value);
      if (result.success) {
        router.replace({name: 'login', query: {mode: 'login'}});
      }
      emit('showMessage', result);
    } catch (error) {
      if (error instanceof Error) {
        emit('showMessage', {success: false, message: error.message});
      }
    }
  }
</script>

<template>
  <form @submit.prevent="handleSignIn" class="min-w-xs">
    <div class="my-5">
      <label for="name">Nazwa użytkownika</label>
      <input id="text" type="text" v-model="username" placeholder="Wpisz nazwę użytkownika" class="input">
    </div>
    <div class="my-5">
      <label for="email">Adres e-mail</label>
      <input id="email" type="text" v-model="email" placeholder="Wpisz swój adres e-mail" class="input">
    </div>
    <div class="my-5">
      <label for="password">Hasło</label>
      <input id="password" type="password" v-model="password" placeholder="Wpisz hasło" class="input">
    </div>
    <div class="my-5">
      <input id="accept-policy" type="checkbox" v-model="acceptPolicy" required class="align-middle">
      <label for="accept-policy" class="text-xs ml-2">
        Zgadzam się z regulaminem i polityką firmy
      </label>
    </div>
    <button type="submit" class="my-8 w-full btn">
      Zarejestruj się
    </button>
  </form>
</template>