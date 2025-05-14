<script setup lang="ts">
  const props = defineProps({
    activePage: {type: Number, required: true},
    totalPages: {type: Number, required: true}
  });
  
  const emit = defineEmits({
    changePage: (page: number) => {return true}
  });

  function handleClickPage (pageNumber: number) {
    emit('changePage', pageNumber);
  }
</script>

<template>
  <div class="flex justify-center items-center gap-16">
    <button @click="handleClickPage(activePage - 1)" class="hidden sm:block" :disabled="activePage <= 1">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M27 30L15 16L27 2" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14 30L2 16L14 2" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <ul class="sm:w-sm md:w-lg flex justify-center gap-4 md:gap-8">
      <li v-if="activePage > 3"> <!-- First page -->
        <button @click="handleClickPage(1)" class="pagination-tab">
          1
        </button>
      </li>
      <li v-if="activePage > 4">...</li> <!-- Break -->
      <li v-if="activePage > 2">
        <button @click="handleClickPage(activePage - 2)" class="pagination-tab">
          {{ activePage - 2 }}
        </button>
      </li>
      <li v-if="activePage > 1">
        <button @click="handleClickPage(activePage - 1)" class="pagination-tab">
          {{ activePage - 1 }}
        </button>
      </li>
      <li>
        <button class="bg-dominant-primary border-dominant-primary pagination-tab scale-120">{{ activePage }}</button> <!-- Current Page -->
      </li>
      <li v-if="activePage < totalPages">
        <button @click="handleClickPage(activePage + 1)" class="pagination-tab">
          {{ activePage + 1 }}
        </button>
      </li>
      <li v-if="activePage < totalPages - 1">
        <button @click="handleClickPage(activePage + 2)" class="pagination-tab">
          {{ activePage + 2 }}
        </button>
      </li>
      <li v-if="activePage < totalPages - 3">...</li> <!-- Break -->
      <li v-if="activePage < totalPages - 2"> <!-- Last page -->
        <button @click="handleClickPage(totalPages)" class="pagination-tab">
          {{ totalPages }}
        </button>
      </li>
    </ul>
    <button @click="handleClickPage(activePage + 1)" class="hidden sm:block" :disabled="activePage >= totalPages">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 30L17 16L5 2" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M18 30L30 16L18 2" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>
</template>