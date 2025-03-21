<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { ref } from 'vue';
  import LoginForm from '@/components/login-forms/LoginForm.vue';
  import SigninForm from '@/components/login-forms/SigninForm.vue';

  const loginMode = ref(true);
</script>

<template>
  <section class="flex items-center">
    <div class="m-8 max-w-md w-md">
      <h1 class="text-5xl">
        {{loginMode ? 'Witamy ponownie!' : 'Zacznij teraz!'}}
      </h1>
      <p v-if="loginMode" class="my-4">
        Wprowadź swoje dane uwierzytelniające, aby uzyskać dostęp do swojego konta
      </p>
      <div v-if="loginMode" class="my-8">
        <LoginForm />
      </div>
      <div v-else class="my-8">
        <SigninForm />
      </div>
      <div class="flex items-center">
        <svg viewBox="0 0 100 2" xmlns="http://www.w3.org/2000/svg">
          <line y1="1" x2="100" y2="1" stroke="#EEEEEE" stroke-width="2" vector-effect="non-scaling-stroke"/>
        </svg>
        <span class="px-4">or</span>
        <svg viewBox="0 0 100 2" xmlns="http://www.w3.org/2000/svg">
          <line y1="1" x2="100" y2="1" stroke="#EEEEEE" stroke-width="2" vector-effect="non-scaling-stroke"/>
        </svg>
      </div>
      <div class="flex justify-between mt-20 mb-5">
        <button type="button" class="cursor-pointer">
          Sign in with Google
        </button>
        <button type="button" class="cursor-pointer">
          Sign in with Apple
        </button>
      </div>
      <p v-if="loginMode" class="text-center">
        Nie masz konta?
        <button @click="loginMode = false" class="ml-2 cursor-pointer text-sky-800">
          Zarejestruj się
        </button>
      </p>
      <p v-else class="text-center">
        Masz konto?
        <button @click="loginMode = true" class="ml-2 cursor-pointer text-sky-800">
          Zaloguj się
        </button>
      </p>
    </div>
    <img src="/images/common/white-bmw.webp" alt="white bmw" class="min-w-xs">
  </section>
</template>