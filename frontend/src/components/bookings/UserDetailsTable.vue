<script setup lang="ts">
  import { User } from '@/utilities/models/userModel';
  import type { PropType } from 'vue';

  defineProps({
    user: {type: Object as PropType<User>, required: true}
  });
</script>

<template>
  <table class="table-fixed w-full border-separate border-spacing-x-0 border-spacing-y-2">
    <tr class="text-left text-sm text-neutral-600">
      <th id="booking-from" class="font-normal px-4 pt-1">Imię i nazwisko</th>
      <th id="booking-to" class="font-normal px-4 pt-1">Numer telefonu</th>
    </tr>
    <tr class="bg-light-tertiary">
      <td headers="booking-from" class="px-4 py-2 rounded-l-lg">
        {{ user.firstName + " " + user.surname }}
      </td>
      <td headers="booking-to" class="px-4 py-2 rounded-r-lg">
        {{ user.phoneNumber }}
      </td>
    </tr>
    <tr v-if="user.email" class="text-left text-sm text-neutral-600">
      <th id="booking-driver" colspan="2" class="font-normal px-4 pt-3">
        Adres e-mail
      </th>
    </tr>
    <tr v-if="user.email" class="bg-light-tertiary">
      <td colspan="2" class="px-4 py-2 rounded-lg font-medium">
        {{ user.email }}
      </td>
    </tr>
  </table>
</template>