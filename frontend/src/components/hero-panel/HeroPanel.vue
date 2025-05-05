<script setup lang="ts">
  import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="relative h-110 sm:h-140 lg:h-160">
    <div class="h-full w-2/5 min-w-3xs sm:min-w-sm bg-dark-bg px-6 sm:px-12 lg:px-16 pt-8 sm:pt-12 lg:pt-16 pb-30 sm:pb-34 lg:pb-38">
      <article class="w-fit h-full text-light-txt p-4 sm:p-8 bg-neutral-500/50 relative z-10 whitespace-nowrap">
        <h1 class="text-2xl sm:text-4xl lg:text-5xl">
          Ciesz się życiem dzięki<br>
          naszym wygodnym<br>
          samochodom.
        </h1>
        <p class="text-md sm:text-xl lg:text-2xl mt-2 lg:mt-4 mb-8">
          Carent jest gotowy zaoferować<br>
          najlepsze doświadczenie w zakresie<br>
          wynajmu samochodów.
        </p>
        <RouterLink :to="{name: 'login'}" class="btn block w-fit text-dark-txt text-sm sm:text-base">
          Zaloguj się | Zarejestruj się
        </RouterLink>
      </article>
    </div>
    <img 
      src="/images/common/aaron-huber-8qYE6LGHW-c-unsplash.webp"
      alt="samochód do wynajęcia z oferty Carent"
      class="absolute right-0 top-0 w-4/5 sm:w-2/3 h-88 sm:h-118 lg:h-138 object-cover object-left"
    >
  </div>
</template>