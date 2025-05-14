<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import LastOrderCar from '@/components/banners/LastOrderCar.vue';
  import AnaliticsPanel from '@/components/analitics-panel/AnaliticsPanel.vue';
</script>

<template>
  <section class="p-4 xl:p-8">
    <div>
      <LastOrderCar />
    </div>
    <div class="my-8">
      <h2 class="text-2xl my-5">Twój ostatni przejazd</h2>
      <nav>
        <ul class="flex gap-5">
          <li>
            <RouterLink :to="{name: 'user-analitics'}" class="text-sm xs:text-base">
              Analityka
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="{name: 'user-bookings'}" class="text-sm xs:text-base">
              <span class="hidden xs:inline-block">Twoje</span> <span class="capitalize xs:normal-case">zamówienia</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="{name: 'user-rent'}" class="text-sm xs:text-base">
              Wynajmij <span class="hidden xs:inline-block">samochód</span>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
    <div>
      <AnaliticsPanel />
    </div>
  </section>
</template>