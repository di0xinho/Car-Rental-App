<script setup lang="ts">
  import useUser from '@/composables/useUser';
  const { user } = useUser();
</script>

<template>
  <dl class="grid grid-cols-2 gap-8">
    <div>
      <dt class="font-semibold">Imię i nazwisko</dt>
      <dd class="my-4 mx-8">{{ user?.firstName + ' ' + user?.surname }}</dd>
    </div>
    <div>
      <dt class="font-semibold">Numer telefonu</dt>
      <dd class="my-4 mx-8">{{ user?.phoneNumber }}</dd>
    </div>
    <div>
      <dt class="font-semibold">Adres</dt>
      <dd class="my-4 mx-8">{{ user?.address }}</dd>
    </div>
    <div>
      <dt class="font-semibold">Email</dt>
      <dd class="my-4 mx-8">{{ user?.email }}</dd>
    </div>
  </dl>
</template>