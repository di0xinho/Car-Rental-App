<script setup lang="ts">
  defineProps({
    image: {type: String, default: "/users/default_user.webp"},
    author: {type: String, required: true}
  })
</script>

<template>
  <figure class="flex flex-col justify-between bg-neutral-100 rounded-3xl h-full">
    <blockquote class="mb-16 mt-8 mx-4">
      <div class="ml-8 h-16">
        <!-- double quotes symbol -->
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="h-14">
          <g>
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" fill="var(--color-dominant-primary)"/>
          </g>
        </svg>
      </div>
      <p class="text-center">
        <slot/>
      </p>
    </blockquote>
    <figcaption class="bg-dominant-primary relative h-28 rounded-b-3xl">
      <img 
        :src="image"
        alt="user image"
        class="m-auto w-20 rounded-full absolute -top-10 left-1/2 -translate-x-1/2"
      >
      <h5 class="text-center mt-16">{{ author }}</h5>
    </figcaption>
  </figure>
</template>