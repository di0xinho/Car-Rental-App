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
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 2L12 12L22 22" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11 2L1 12L11 22" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 2L12 12L2 22" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M13 2L23 12L13 22" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>
</template>