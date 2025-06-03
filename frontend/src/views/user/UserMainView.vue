<script setup lang="ts">
  import { Rent } from '@/utilities/models/rentModel';
  import { getActiveRent } from '@/utilities/rentUtilis';
  import { RouterLink } from 'vue-router';
  import { onMounted, ref } from 'vue';
  import LastOrderCar from '@/components/banners/LastOrderCar.vue';
  import RentInfoPanel from '@/components/rent-info-panel/RentInfoPanel.vue';

  const activeRent = ref<Rent|undefined>();

  onMounted (() => {
    activeRent.value = getActiveRent();
  });
</script>

<template>
  <section class="min-h-full flex flex-col gap-8 p-4 xl:p-8">
    <div>
      <LastOrderCar />
    </div>
    <nav>
      <ul class="flex gap-5">
        <li>
          <RouterLink :to="{name: 'user-history'}" class="text-sm xs:text-base">
            Historia wynajmu
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{name: 'user-bookings'}" class="text-sm xs:text-base">
            <span class="hidden xs:inline-block">Moje</span> <span class="capitalize xs:normal-case">rezerwacje</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{name: 'user-rent'}" class="text-sm xs:text-base">
            Wynajmij <span class="hidden xs:inline-block">samochód</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
    <h2 class="text-xl xs:text-2xl">Aktywne wypożyczenia</h2>
    <div v-if="activeRent" class="my-auto">
      <!-- Actual ongoing rent -->
      <RentInfoPanel :rent="activeRent" />
    </div>
    <div v-else class="my-auto">
      <h3 class="text-lg xs:text-xl text-center my-12">Brak aktywnych wypożyczeń</h3>
    </div>
  </section>
</template>