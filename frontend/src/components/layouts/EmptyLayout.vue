<template>
  <div class="min-h-screen flex flex-col dark:text-light-txt">
    <button @click="$router.back" class="ml-auto mr-8 my-4">
      <span class="text-xl mx-2">&#10229;</span>
      <span>Powrót</span>
    </button>
    <main class="my-auto">
      <slot/>
    </main>
  </div>
</template>