<script setup lang="ts">
  import { RouterLink } from 'vue-router';
</script>

<template>
  <section class="max-w-3xl mx-auto">
    <h2 class="text-4xl font-semibold mb-24 text-center">
      Rezerwacja nie powiodła się !
    </h2>
    <p class="text-xl text-center">
      Spróbuj jeszcze raz.
      <RouterLink :to="{name: 'rent'}" class="text-sky-800">
        Wybierz samochód i zarezerwuj
        <span class="mx-2 text-2xl">&#10230;</span>
      </RouterLink>
    </p>
  </section>
</template>