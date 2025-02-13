<script setup lang="ts">
  import HeroPanel from '@/components/hero-panel/HeroPanel.vue';
  import CarsCollection from '@/components/cars-collection/CarsCollection.vue';
  import CompanyValues from '@/components/company-values/CompanyValues.vue';
  import CustomerOpinions from '@/components/customers_opinions/CustomerOpinions.vue';
</script>

<template>
    <section>
      <HeroPanel />
    </section>
    <section>
      <CompanyValues />
    </section>
    <section id="cars">
      <CarsCollection />
    </section>
    <section>
      <CustomerOpinions />
    </section>
</template>