<script setup lang="ts">
  defineProps({
    image: {type: String, required: false},
    author: {type: String, required: true}
  })
</script>

<template>
  <figure>
    <div class="text-8xl">&#10077;</div>
    <blockquote>
      <p>
        <slot/>
      </p>
    </blockquote>
    <figcaption>
      <img src="" alt="">
      <h5>Name</h5>
    </figcaption>
  </figure>
</template>