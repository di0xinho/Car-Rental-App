<script setup lang="ts">
  import { dateToNormalizedString } from '@/utilities/convertDateFormat';
  const dateFrom= defineModel('dateFrom', {type: String, required: true});
  const dateTo= defineModel('dateTo', {type: String, required: true})

  const currentDateString = dateToNormalizedString(new Date(), "T");
</script>

<template>
  <form class="flex flex-col sm:flex-row gap-y-3">
    <div class="flex gap-x-6 sm:flex-col justify-between sm:pr-8 sm:border-r">
      <label for="from" class="font-semibold">
        Data wynajmu
      </label>
      <input id="from" type="datetime-local" :min="currentDateString" v-model="dateFrom">
    </div>
    <hr class="lg:hidden">
    <div class="flex gap-x-6 sm:flex-col justify-between sm:pl-8">
      <label for="to" class="font-semibold">
        Data powrotu
      </label>
      <input id="to" type="datetime-local" :min="currentDateString" v-model="dateTo">
    </div>
  </form>
</template>