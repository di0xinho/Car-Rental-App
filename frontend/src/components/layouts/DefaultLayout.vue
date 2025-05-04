<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import HeroPanel from '@/components/hero-panel/HeroPanel.vue';
  import LinksList from './default-components/LinksList.vue';
  import PromotedCarBanner from '../banners/PromotedCarBanner.vue';
  import DiscountBanner from '@/components/banners/DiscountBanner.vue';
  import SocialMediaLinks from '@/components/layouts/default-components/SocialMediaLinks.vue';
  import DarkModeSwitch from '@/components/layouts/common-components/DarkModeSwitch.vue';
  import MobileNavigation from './default-components/MobileNavigation.vue';
  import AddressPanel from '../address-panel/AddressPanel.vue';
  import useUser from '@/composables/useUser';

  const { user } = useUser();
</script>

<template>
  <div class="min-h-screen flex flex-col gap-15 dark:text-light-txt">
    <header>
      <div class="h-22 flex justify-between items-center">
        <div class="w-2/5 min-w-3xs sm:min-w-sm h-full bg-dark-bg text-light-txt flex justify-between items-center px-6 sm:px-16">
          <MobileNavigation class="lg:hidden"/>
          <h1 class="text-dominant-primary">
            CARENT
          </h1>
          <DarkModeSwitch class="hidden lg:flex" />
        </div>
        <nav class="hidden lg:block">
          <ul class="flex gap-6 mx-6 xl:gap-8 xl:mx-8">
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
        <RouterLink v-if="user" :to="{name: 'user-main'}" class="mx-6 flex gap-4 items-center">
            <img src="/users/default_user.webp" alt="user avatar" class="h-15 rounded-full border border-dominant-primary">
            <h4 class="hidden sm:block">{{ user.username }}</h4>
        </RouterLink>
        <RouterLink v-else :to="{name: 'login'}" class="mx-6">
          <div class="hidden sm:block btn">Zaloguj się</div>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="sm:hidden">
            <circle cx="20" cy="10" r="8" stroke="#FE8400" stroke-width="3"/>
            <path d="M2.13867 38C3.56691 29.4869 10.9708 23 19.8898 23C28.8088 23 36.2127 29.4869 37.6409 38" stroke="#FE8400" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </RouterLink>
      </div>
      <div>
        <HeroPanel />
      </div>
    </header>
    <main class="grow">
      <slot/>
    </main>
    <section class="mx-6 sm:mx-18">
      <DiscountBanner />
    </section>
    <section class="mx-6 sm:mx-18">
      <PromotedCarBanner />
    </section>
    <footer class="bg-footer-bg text-light-txt dark:text-dominant-secondary px-6 py-16 sm:p-16">
      <div class="flex flex-col sm:flex-row lg:flex-col gap-16 justify-between max-w-xs sm:max-w-full mx-auto">
        <AddressPanel />
        <div class="flex flex-col lg:flex-row gap-x-16 gap-y-8 justify-between lg:items-end">
          <h3 class="text-lg font-semibold">
            Ciesz się jazdą dzięki<br>
            naszym wygodnym samochodom.
          </h3>
          <div>
            <h3 class="text-lg font-semibold mb-2">Przydatne linki</h3>
            <nav>
              <ul class="grid grid-cols-[repeat(2,_max-content)] md:grid-cols-[repeat(4,_max-content)] gap-x-8 gap-y-2 italic justify-between">
                <li><RouterLink :to="{name: 'home'}">Główna</RouterLink></li>
                <li><RouterLink :to="{name: 'about'}">O nas</RouterLink></li>
                <li><RouterLink :to="{name: 'cars-collection'}">Samochody</RouterLink></li>
                <li><RouterLink :to="{name: 'user-main'}">Panel użytkownika</RouterLink></li>
              </ul>
            </nav>
          </div>
          <SocialMediaLinks />
        </div>
      </div>
      <h5 class="text-center text-sm mt-16">
        WSB MERITO Tworzenie aplikacji internetowych i mobilnych (Projekt&nbsp;zaliczeniowy)<br>
        Autorzy: Michał Michalski, Nazar Mykhailiuk, Miłosz Gajda
      </h5>
    </footer>
  </div>
</template>