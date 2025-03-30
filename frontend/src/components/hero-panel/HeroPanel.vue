<script setup lang="ts">
  import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="relative">
  <!-- Alternatywnie ustawienie tła: <div class="bg-linear-to-r from-neutral-900 to-neutral-900 bg-[40%_auto] bg-left bg-no-repeat relative flex items-center min-h-160"> -->
    <div class="bg-dark-bg flex items-center w-2/5 min-h-160">
      <article class="text-light-txt p-8 bg-neutral-500/50 relative z-10 m-16 whitespace-nowrap">
        <h1 class="text-5xl text-light-txt">
          Ciesz się życiem dzięki<br>
          naszym wygodnym<br>
          samochodom.
        </h1>
        <p class="text-neutral-50 text-2xl mt-8 mb-14">
          Carent jest gotowy zaoferować<br>
          najlepsze doświadczenie w zakresie<br>
          wynajmu samochodów.
        </p>
        <RouterLink :to="{name: 'login'}" class="btn text-dark-txt">
          Zaloguj się | Zarejestruj się
        </RouterLink>
      </article>
    </div>
    <img 
      src="/images/common/aaron-huber-8qYE6LGHW-c-unsplash.webp"
      alt="samochód do wynajęcia z oferty Carent"
      class="w-2/3 absolute right-0 top-0"
    >
  </div>
</template>