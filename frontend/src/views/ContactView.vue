<script setup lang="ts">
  import ContactForm from '@/components/contact-form/ContactForm.vue';
</script>

<template>
  <section class="my-15 mx-18">
    <h2 class="text-5xl text-center mb-30">
      Masz pytanie? Napisz do nas.
    </h2>
    <div class="flex justify-between gap-15">
      <div class="basis-md grow">
        <ContactForm />
      </div>
      <img src="/images/common/car-keys.webp" alt="car keys" class="w-md">
    </div>
  </section>
</template>