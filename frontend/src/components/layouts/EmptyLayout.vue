<template>
  <div class="min-h-screen flex flex-col dark:text-light-txt">
    <RouterLink :to="{name: 'home'}" class="ml-auto mr-8 my-4">
      <span class="text-xl my-2">&#8592;</span> Wróć na stronę główną
    </RouterLink>
    <main class="my-auto">
      <slot/>
    </main>
  </div>
</template>