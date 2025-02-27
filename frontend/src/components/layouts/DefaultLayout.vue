<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import HeroPanel from '@/components/hero-panel/HeroPanel.vue';
  import LinksList from './default-components/LinksList.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header>
      <div class="flex justify-between items-center">
        <h1 class="w-2/5 bg-neutral-900 py-8 px-16 text-dominant-primary">CARENT</h1>
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
              <RouterLink :to="{name: 'cars-collection'}">Samochody</RouterLink>
            </li>
            <li>
              <RouterLink :to="{name: 'contact'}">Kontakt</RouterLink>
            </li>
          </ul>
        </nav>
        <RouterLink :to="{name: 'login'}">Zaloguj się | Zarejestruj się</RouterLink>
      </div>
      <div>
        <HeroPanel />
      </div>
    </header>
    <main class="grow">
      <slot/>
    </main>
    <footer class="bg-neutral-900 text-neutral-50 flex flex-col pt-35 pb-20 px-30">
      <nav class="flex gap-12 justify-between">
        <LinksList title="Rezerwacje">
          <li>Wynajmij Samochód</li>
          <li>Modyfikuj Lub Anuluj</li>
          <li>Pobierz Potwierdzenie</li>
        </LinksList>
        <LinksList title="Obsługa Użytkownika">
          <li>Pomoc / FAQS</li>
          <li>Prasa</li>
          <li>Blog</li>
          <li>Skontaktuj się z Nami</li>
        </LinksList>
        <LinksList title="Firma">
          <li>O Nas</li>
          <li>Praca</li>
          <li>Dokumenty & Zarządzenia</li>
        </LinksList>
      </nav>
      <hr class="border-neutral-50 my-6">
      <div class="self-end">
        <a href="https://x.com/" class="mx-4">
          <img src="/images/layout/twitter-icon.svg" alt="Twitter Icon" class="inline-block">
        </a>
        <a href="https://www.facebook.com" class="mx-4">
          <img src="/images/layout/facebook-icon.svg" alt="Facebook Icon" class="inline-block">
        </a>
        <a href="https://www.instagram.com/" class="mx-4">
          <img src="/images/layout/instagram-icon.svg" alt="Instagram Icon" class="inline-block">
        </a>
      </div>
    </footer>
  </div>
</template>