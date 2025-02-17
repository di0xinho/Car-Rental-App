<script setup lang="ts">
  import { RouterLink } from 'vue-router';
</script>

<template>
    <header class="flex justify-between items-center">
      <h1 class="w-2/5 bg-neutral-900 py-8 px-16 text-glow">CARENT</h1>
      <nav>
        <ul class="flex gap-8">
          <li>
            <RouterLink :to="{name: 'home'}">Główna</RouterLink>
          </li>
          <li>
            <RouterLink :to="{name: 'about'}">O nas</RouterLink>
          </li>
          <li>
            <RouterLink :to="{name: 'reservation'}">Rezerwacja</RouterLink>
          </li>
          <li>
            <RouterLink :to="{name: 'home', hash: '#cars'}">Samochody</RouterLink>
          </li>
          <li>
            <RouterLink :to="{name: 'contact'}">Kontakt</RouterLink>
          </li>
        </ul>
      </nav>
      <RouterLink :to="{name: 'login'}">Zaloguj się | Zarejestruj się</RouterLink>
    </header>
    <main class="grow">
      <slot/>
    </main>
    <footer class="flex justify-between p-8">
      <h5>WSB MERITO Tworzenie aplikacji internetowych i mobilnych (Projekt zaliczeniowy)</h5>
      <h5>Autorzy: Michał Michalski, Nazar Mykhailiuk, Miłosz Gajda</h5>
    </footer>
</template>