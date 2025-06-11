<script setup lang="ts">
  import { ref } from 'vue';
  import LogInForm from '@/components/login-forms/LoginForm.vue';
  import SignInForm from '@/components/login-forms/SignInForm.vue';

  const message = ref<{success: boolean, message: string}|null>(null);

  function showMessageHandler(event: {success: boolean, message: string}) {
    message.value = event;
  }
</script>

<template>
  <section class="my-8">
    <!-- Message block -->
    <div v-if="message" class="text-center mx-8 p-2 border rounded-lg" :class="[message.success ? 'text-lime-500' : 'text-red-400']">
      {{ message.message }}
    </div>
    <!-- Login form -->
    <div class="flex flex-col sm:flex-row items-center">
      <div class="m-5 sm:m-8 min-w-xs lg:min-w-100 basis-md max-w-md">
        <h1 class="text-2xl sm:text-4xl lg:text-5xl">
          {{ $route.query.mode === 'login'? 'Witamy ponownie!' : 'Zacznij teraz!' }}
        </h1>
        <p v-if="$route.query.mode === 'login'" class="my-4">
          Wprowadź swoje dane uwierzytelniające, aby uzyskać dostęp do swojego konta
        </p>
        <div v-if="$route.query.mode === 'login'" class="my-8">
          <LogInForm />
        </div>
        <div v-if="$route.query.mode === 'signin'" class="my-8">
          <SignInForm @show-message="showMessageHandler"/>
        </div>
        <div class="flex items-center my-12">
          <svg viewBox="0 0 100 2" xmlns="http://www.w3.org/2000/svg">
            <line y1="1" x2="100" y2="1" stroke="#EEEEEE" stroke-width="2" vector-effect="non-scaling-stroke"/>
          </svg>
          <span class="px-4">or</span>
          <svg viewBox="0 0 100 2" xmlns="http://www.w3.org/2000/svg">
            <line y1="1" x2="100" y2="1" stroke="#EEEEEE" stroke-width="2" vector-effect="non-scaling-stroke"/>
          </svg>
        </div>
        <div class="flex justify-between my-6">
          <button type="button" class="cursor-pointer">
            Sign in with Google
          </button>
          <button type="button" class="cursor-pointer">
            Sign in with Apple
          </button>
        </div>
        <p v-if="$route.query.mode === 'login'" class="text-center">
          Nie masz konta?
          <button @click="$router.replace({name: 'login', query: {mode: 'signin'}})" class="ml-2 cursor-pointer text-sky-800">
            Zarejestruj się
          </button>
        </p>
        <p v-if="$route.query.mode === 'signin'" class="text-center">
          Masz konto?
          <button @click="$router.replace({name: 'login', query: {mode: 'login'}})" class="ml-2 cursor-pointer text-sky-800">
            Zaloguj się
          </button>
        </p>
      </div>
      <img src="/images/common/white-bmw.webp" alt="white bmw" class="min-w-xs sm:h-110 shrink-2 object-cover object-left">
    </div>
  </section>
</template>