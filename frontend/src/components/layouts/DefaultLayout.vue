<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import HeroPanel from '@/components/hero-panel/HeroPanel.vue';
  import LinksList from './default-components/LinksList.vue';
  import MobileAppBanner from '@/components/banners/MobileAppBanner.vue';
  import DiscountBanner from '@/components/banners/DiscountBanner.vue';
  import useUser from '@/composables/useUser';
  import DarkModeSwitch from './common-components/DarkModeSwitch.vue';
  
  const { user } = useUser();
</script>

<template>
  <div class="min-h-screen flex flex-col gap-15 dark:text-page-dark-text">
    <header>
      <div class="flex justify-between items-center">
        <div class="w-2/5 bg-neutral-900 flex">
          <h1 class="py-8 px-16 text-dominant-primary">
            CARENT
          </h1>
          <DarkModeSwitch />
        </div>
        <nav>
          <ul class="flex gap-8 mx-8">
            <li>
              <RouterLink :to="{name: 'home'}">Główna</RouterLink>
            </li>
            <li>
              <RouterLink :to="{name: 'about'}">O nas</RouterLink>
            </li>
            <li>
              <RouterLink :to="{name: 'rent'}">Wynajem</RouterLink>
            </li>
            <li>
              <RouterLink :to="{name: 'cars-collection'}">Samochody</RouterLink>
            </li>
            <li>
              <RouterLink :to="{name: 'contact'}">Kontakt</RouterLink>
            </li>
          </ul>
        </nav>
        <RouterLink v-if="user" :to="{name: 'user-main'}" class="flex gap-4 items-center ml-16">
          <img src="/users/default_user.webp" alt="user avatar" class="h-15 rounded-full border border-dominant-primary">
          <h4>{{ user.firstName + ' ' + user.surname }}</h4>
        </RouterLink>
        <RouterLink v-else :to="{name: 'login'}" class="mx-8 py-2 px-4 bg-dominant-primary rounded-sm">
          Zaloguj się | Zarejestruj się
        </RouterLink>
      </div>
      <div>
        <HeroPanel />
      </div>
    </header>
    <main class="grow">
      <slot/>
    </main>
    <section class="mx-18">
      <DiscountBanner />
    </section>
    <section class="mx-18">
      <MobileAppBanner />
    </section>
    <footer class="bg-footer-bg text-neutral-50 flex flex-col pt-35 pb-20 px-30">
      <nav class="flex gap-12 justify-between">
        <LinksList title="Wynajem">
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