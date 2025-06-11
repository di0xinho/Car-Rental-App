<script setup lang="ts">
  defineProps({
    color: {type: String, required: true}
  });
</script>

<template>
  <div class="flex gap-4">
    <dt class="text-sm text-neutral-600">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 13C17 16.866 13.866 20 10 20C6.13401 20 3 16.866 3 13C3 9.13401 10 0 10 0C10 0 17 9.13401 17 13Z" fill="#90A3BF"/>
    </svg>
    </dt>
    <dd>{{ color }}</dd>
  </div>
</template>