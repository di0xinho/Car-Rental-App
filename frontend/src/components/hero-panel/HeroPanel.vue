<script setup lang="ts">
  import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="relative">
  <!-- Alternatywnie ustawienie tła: <div class="bg-linear-to-r from-neutral-900 to-neutral-900 bg-[40%_auto] bg-left bg-no-repeat relative flex items-center min-h-160"> -->
    <div class="bg-neutral-900 flex items-center w-2/5 min-h-160">
      <article class="text-neutral-50 p-8 bg-neutral-500/50 relative z-30 m-16 whitespace-nowrap">
        <h1 class="text-5xl">
          Ciesz się życiem dzięki<br>
          naszym wygodnym<br>
          samochodom.
        </h1>
        <p class="text-2xl mt-8 mb-14">
          Carent jest gotowy zaoferować<br>
          najlepsze doświadczenie w zakresie<br>
          wynajmu samochodów.
        </p>
        <RouterLink to="/login" class="py-3 px-6 bg-glow text-center">Zaloguj się | Zarejestruj się</RouterLink>
      </article>
    </div>
    <img 
      src="/images/hero/car_img_placeholder_1.svg"
      alt="samochód do wynajęcia z oferty Carent"
      class="w-2/3 absolute right-0 top-1/2 -translate-y-1/2"
    >
  </div>
</template>