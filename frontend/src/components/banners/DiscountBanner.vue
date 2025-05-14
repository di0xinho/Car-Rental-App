<script setup lang="ts">
  import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="banner py-10 px-6 sm:px-10 lg:px-20 bg-[url('/images/discount-banner/car-blured.webp')] bg-[position:bottom_left_7rem] md:bg-[position:bottom_left_100%] lg:bg-[position:bottom_left_80%] bg-[length:32rem] bg-no-repeat text-sm sm:text-base">
    <h4 class="text-2xl sm:text-3xl lg:text-5xl">
      Zarejestruj się i odbierz 10%&nbsp;rabatu!
    </h4>
    <p class="my-4">
      Dołącz do naszej społeczności i ciesz się wyjątkowymi korzyściami! Zarejestruj się na naszej stronie już dziś, a otrzymasz 10% zniżki na pierwszy wynajem samochodu.
    </p>
    <ul class="my-6">
      <li>
        <img src="/images/discount-banner/checked.svg" alt="list style element" class="inline-block w-4 align-baseline">
        <span class="ml-4">Szybka i prosta rejestracja</span>
      </li>
      <li>
        <img src="/images/discount-banner/checked.svg" alt="list style element" class="inline-block w-4 align-baseline">
        <span class="ml-4">Ekskluzywne rabaty i oferty specjalne</span>
      </li>
      <li>
        <img src="/images/discount-banner/checked.svg" alt="list style element" class="inline-block w-4 align-baseline">
        <span class="ml-4">Wygodne zarządzanie rezerwacjami</span>
      </li>
    </ul>
    <p class="mb-8">Nie czekaj - załóż konto i ruszaj w podróż taniej!</p>
    <RouterLink :to="{name: 'login'}" class="btn inline-block text-dark-txt bg-dominant-secondary">
      Zaloguj się | Zarejestruj się
    </RouterLink>
  </div>
</template>