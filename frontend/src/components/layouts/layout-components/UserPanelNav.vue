<script setup lang="ts">
  import HomeSvg from '@/components/icons/HomeSvg.vue';
  import CallendarSvg from '@/components/icons/CallendarSvg.vue';
  import ChartSvg from '@/components/icons/ChartSvg.vue';
  import GearSvg from '@/components/icons/GearSvg.vue';

  defineProps({
    listClass: {type: String, default: ''},
    linkTextClass: {type: String, default: ''}
  });
</script>

<template>
  <nav>
    <ul class="flex gap-y-4 gap-x-1" :class="listClass">
      <li>
        <RouterLink :to="{name: 'user-main'}" class="flex gap-3 items-center p-3 lg:px-8 rounded-l-full">
          <HomeSvg />
          <span :class="linkTextClass">Panel główny</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="{name: 'user-bookings'}" class="flex gap-3 items-center p-3 lg:px-8 rounded-l-full">
          <CallendarSvg />
          <span :class="linkTextClass">Moje rezerwacje</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="{name: 'user-history'}" class="flex gap-3 items-center p-3 lg:px-8 rounded-l-full">
          <ChartSvg />
          <span :class="linkTextClass">Historia wynajmu</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="{name: 'user-settings'}" class="flex gap-3 items-center p-3 lg:px-8 rounded-l-full">
          <GearSvg />
          <span :class="linkTextClass">Ustawienia</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>