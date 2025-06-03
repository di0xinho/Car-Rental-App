<script setup lang="ts">
  import HomeSvg from './icons/HomeSvg.vue';
  import CarSvg from './icons/CarSvg.vue';
  import CallendarSvg from './icons/CallendarSvg.vue';
  import KeySvg from './icons/KeySvg.vue';
</script>

<template>
  <nav class="flex gap-6 lg:gap-8">
    <RouterLink :to="{name: 'admin-dashboard'}" class="flex gap-3 items-center">
      <HomeSvg />
      <span class="hidden md:inline-block">Panel główny</span>
    </RouterLink>
    <RouterLink :to="{name: 'admin-cars'}" class="flex gap-3 items-center">
      <CarSvg />
      <span class="hidden md:inline-block">Samochody</span>
    </RouterLink>
    <RouterLink :to="{name: 'admin-bookings'}" class="flex gap-3 items-center">
      <CallendarSvg />
      <span class="hidden md:inline-block">Rezerwacje</span>
    </RouterLink>
    <RouterLink :to="{name: 'admin-rents'}" class="flex gap-3 items-center">
      <KeySvg />
      <span class="hidden md:inline-block">Wynajem</span>
    </RouterLink>
  </nav>
</template>