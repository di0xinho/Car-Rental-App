<script setup lang="ts">
  import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="banner pt-20 pb-10 px-22 bg-[url('/images/discount-banner/car-blured.webp')] bg-[position:bottom_right_20%] bg-[length:40%] bg-no-repeat">
    <h4 class="text-5xl">Zarejestruj się i odbierz 10% rabatu!</h4>
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