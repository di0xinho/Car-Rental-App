<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import HeroPanel from '@/components/hero-panel/HeroPanel.vue';
  import LinksList from './default-components/LinksList.vue';
  import MobileAppBanner from '@/components/banners/MobileAppBanner.vue';
  import DiscountBanner from '@/components/banners/DiscountBanner.vue';
  import SocialMediaLinks from '@/components/layouts/default-components/SocialMediaLinks.vue';
  import DarkModeSwitch from '@/components/layouts/common-components/DarkModeSwitch.vue';
  import useUser from '@/composables/useUser';

  const { user } = useUser();
</script>

<template>
  <div class="min-h-screen flex flex-col gap-15 dark:text-light-txt">
    <header>
      <div class="flex justify-between items-center">
        <div class="w-2/5 bg-dark-bg text-light-txt flex justify-between px-16">
          <h1 class="my-8 text-dominant-primary">
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
          <h4>{{ user.username }}</h4>
        </RouterLink>
        <RouterLink v-else :to="{name: 'login'}" class="mx-8 btn">
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
    <footer class="bg-footer-bg text-light-txt dark:text-dominant-secondary flex flex-col pt-35 pb-20 px-30">
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
      <hr class="border- my-6">
      <div class="self-end">
        <SocialMediaLinks />
      </div>
    </footer>
  </div>
</template>