<script setup lang="ts">
  defineProps({
    year: {type: Number, required: true}
  });
</script>

<template>
  <div class="flex gap-4">
    <dt class="text-sm text-neutral-600">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g fill="#90A3BF">
          <path d="M0 7H20V18C20 19.1046 19.1046 20 18 20H2C0.895431 20 0 19.1046 0 18V7Z" />
          <path d="M0 3C0 2.44772 0.447715 2 1 2H2V3C2 4.10457 2.89543 5 4 5V5C5.10457 5 6 4.10457 6 3V2H8V3C8 4.10457 8.89543 5 10 5V5C11.1046 5 12 4.10457 12 3V3V2H14V3C14 4.10457 14.8954 5 16 5V5C17.1046 5 18 4.10457 18 3V2H19C19.5523 2 20 2.44772 20 3V6H0V3Z"/>
          <rect x="3" width="2" height="4" rx="1"/>
          <rect x="9" width="2" height="4" rx="1"/>
          <path d="M15 1C15 0.447715 15.4477 0 16 0V0C16.5523 0 17 0.447715 17 1V3C17 3.55228 16.5523 4 16 4V4C15.4477 4 15 3.55228 15 3V1Z"/>
        </g>
      </svg>
    </dt>
    <dd>{{ year }}</dd>
  </div>
</template>