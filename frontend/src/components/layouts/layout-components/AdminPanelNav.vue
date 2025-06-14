<script setup lang="ts">
  import HomeSvg from '@/components/icons/HomeSvg.vue';
  import CarSvg from '@/components/icons/CarSvg.vue';
  import CallendarSvg from '@/components/icons/CallendarSvg.vue';
  import KeySvg from '@/components/icons/KeySvg.vue';
  import HistorySvg from '@/components/icons/HistorySvg.vue';
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
        <RouterLink :to="{name: 'admin-rents'}" class="flex gap-3 items-center">
      <KeySvg />
      <span class="hidden md:inline-block">Wynajem</span>
    </RouterLink>
    <RouterLink :to="{name: 'admin-bookings'}" class="flex gap-3 items-center">
      <CallendarSvg />
      <span class="hidden md:inline-block">Rezerwacje</span>
    </RouterLink>
    <RouterLink :to="{name: 'admin-history'}" class="flex gap-3 items-center">
      <HistorySvg />
      <span class="hidden md:inline-block">Historia</span>
    </RouterLink>
  </nav>
</template>