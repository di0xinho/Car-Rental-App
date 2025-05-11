<script setup lang="ts">
  import { RouterLink } from 'vue-router';
</script>

<template>
  <section class="max-w-3xl mx-auto p-4 sm:p-8">
    <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold mb-16 md:mb-24 text-center">
      Rezerwacja nie powiodła się !
    </h2>
    <p class="text-base sm:text-lg md:text-xl text-center">
      Spróbuj jeszcze raz.
      <RouterLink :to="{name: 'rent'}" class="text-sky-800 inline-block">
        Wybierz samochód i zarezerwuj
        <span class="sm:mx-2 text-lg sm:text-xl md:text-2xl">&#10230;</span>
      </RouterLink>
    </p>
  </section>
</template>