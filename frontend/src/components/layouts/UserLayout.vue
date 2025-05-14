<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import useUser from '@/composables/useUser';
  import { useRouter } from "vue-router";
  import UserPanelNav from '@/components/layouts/layout-components/UserPanelNav.vue';
  import DarkModeSwitch from '@/components/layouts/layout-components/DarkModeSwitch.vue';

  const router = useRouter();

  const { user, logOutUser } = useUser();

  async function handleLogOut() {
    try {
      const result = await logOutUser();
      if (result.success) router.push({name: 'home'});
    } catch (error) {
      console.error(error);
    }
  }
</script>

<template>
    <div class="h-screen grid md:grid-cols-[minmax(200px,_1fr)_minmax(35rem,_3fr)] grid-rows-[4rem_auto_1fr] md:grid-rows-[6rem_1fr] bg-light-secondary-bg dark:bg-dark-secondary-bg gap-2 dark:text-light-txt">
      <header class="md:col-start-2 bg-light-bg dark:bg-dark-bg">
        <div class="flex justify-end items-center h-full gap-8">
          <RouterLink :to="{name: 'home'}" class=" md:hidden text-dominant-primary text-2xl sm:text-3xl ml-6 mr-auto">
            CARENT
          </RouterLink>
          <DarkModeSwitch label-class="hidden md:block"/>
          <div class="flex gap-4 items-center mr-6">
            <img src="/users/default_user.webp" alt="user avatar" class="h-14 rounded-full border border-dominant-primary">
            <h4 class="hidden xs:block">{{ user?.username }}</h4>
          </div>
        </div>
      </header>
      <aside class="col-start-1 md:row-span-full flex md:flex-col justify-between bg-light-bg dark:bg-dark-bg">
        <RouterLink :to="{name: 'home'}" class="hidden md:block h-16 text-dominant-primary text-3xl my-4 mx-auto leading-[4rem]">
          CARENT
        </RouterLink>
        <UserPanelNav list-class="ml-3 md:ml-2 lg:ml-5 md:flex-col" link-text-class="hidden md:block"/>
        <!-- Logout Button -->
        <button class="flex gap-3 items-center p-3 lg:px-8 mr-3 md:mr-0 md:mb-6 md:ml-2 lg:ml-5" @click="handleLogOut">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.90039 7.56023C9.21039 3.96023 11.0604 2.49023 15.1104 2.49023H15.2404C19.7104 2.49023 21.5004 4.28023 21.5004 8.75023V15.2702C21.5004 19.7402 19.7104 21.5302 15.2404 21.5302H15.1104C11.0904 21.5302 9.24039 20.0802 8.91039 16.5402" stroke="#FE8400" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15 12H3.62" stroke="#FE8400" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5.85 8.65002L2.5 12L5.85 15.35" stroke="#FE8400" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="hidden md:block">Wyloguj się</span>
        </button>
      </aside>
      <main class="md:col-start-2 overflow-y-scroll">
        <slot/>
      </main>
    </div>
</template>