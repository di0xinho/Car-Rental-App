<script setup lang="ts">
  import ContactForm from '@/components/contact-form/ContactForm.vue';
</script>

<template>
  <section class="section">
    <h2 class="text-2xl sm:text-4xl lg:text-5xl text-center mb-15 sm:mb-30">
      Masz pytanie? Napisz do nas.
    </h2>
    <div class="flex flex-col md:flex-row justify-between items-stretch gap-8 lg:gap-16">
      <div class="min-w-xs basis-md shrink grow">
        <ContactForm />
      </div>
      <img src="/images/common/car-keys.webp" alt="car keys" class="min-h-72 min-w-2xs basis-xs md:basis-md shrink-4 object-cover">
    </div>
  </section>
</template>