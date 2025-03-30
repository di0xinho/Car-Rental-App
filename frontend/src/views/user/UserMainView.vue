<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import LastOrderCar from '@/components/banners/LastOrderCar.vue';
  import AnaliticsPanel from '@/components/analitics-panel/AnaliticsPanel.vue';
</script>

<template>
  <section class="p-6">
    <div class="h-105">
      <LastOrderCar />
    </div>
    <div class="my-8">
      <h2 class="text-2xl my-5">Twój ostatni przejazd</h2>
      <nav>
        <ul class="flex gap-5">
          <li>
            <button>Ostatnio wybrany samochód</button>
          </li>
          <li>
            <button>Analityka</button>
          </li>
          <li>
            <button>Twoje Ostatnie Zamówienia</button>
          </li>
        </ul>
      </nav>
    </div>
    <div>
      <AnaliticsPanel />
    </div>
  </section>
</template>