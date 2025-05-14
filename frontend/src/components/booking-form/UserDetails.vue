<script setup lang="ts">
  import useUser from '@/composables/useUser';
  const { user } = useUser();
</script>

<template>
  <dl class="grid grid-cols-1 xs:grid-cols-2 gap-x-8 gap-y-4 sm:gap-y-8">
    <div>
      <dt class="font-semibold">Imię i nazwisko</dt>
      <dd class="my-2 sm:my-4 lg:mx-8">{{ user?.firstName + ' ' + user?.surname }}</dd>
    </div>
    <div>
      <dt class="font-semibold">Numer telefonu</dt>
      <dd class="my-2 sm:my-4 lg:mx-8">{{ user?.phoneNumber }}</dd>
    </div>
    <div class="col-span-full">
      <dt class="font-semibold">Email</dt>
      <dd class="my-2 sm:my-4 lg:mx-8">{{ user?.email }}</dd>
    </div>
  </dl>
</template>