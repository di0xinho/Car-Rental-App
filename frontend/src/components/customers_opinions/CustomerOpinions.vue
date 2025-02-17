<script setup lang="ts">
  import OpinionCard from './OpinionCard.vue';

  const customerOpinions = [
    {
      author: "Peter Parker",
      content: "Wynajęcie auta w tej firmie to czysta przyjemność! Proces rezerwacji...."
    },
    {
      author: "Steve Rogers",
      content: "Wynająłem Porshe 911 na weekend i to było niesamowite doświadczenie! Auto w perfekcyjnym...."
    },
    {
      author: "Bruce Banner",
      content: "Bardzo dobry serwis - szybka rezerwacja online, brak ukrytych opłat i doskonały...."
    }
  ];
</script>

<template>
  <div class="flex p-8 gap-8">
    <div v-for="(opinion, index) in customerOpinions" class="min-w-xs basis-xs grow-1">
      <OpinionCard :author="opinion.author">
        {{ opinion.content }}
      </OpinionCard>
    </div>
  </div>
</template>