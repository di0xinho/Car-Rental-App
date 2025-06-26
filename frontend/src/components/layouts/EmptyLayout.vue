<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function handleGoBack () {
  if (window.history.state.back) {
    return router.back()
  } else {
    router.push({name: 'home'});
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col dark:text-light-txt">
    <button @click="handleGoBack" class="ml-auto mr-8 my-4">
      <span class="text-xl mx-2">&#10229;</span>
      <span>Powrót</span>
    </button>
    <main class="my-auto">
      <slot/>
    </main>
  </div>
</template>