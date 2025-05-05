<script setup lang="ts">
  import { onMounted, useTemplateRef } from 'vue';

  const container = useTemplateRef('container');
  let listElement: HTMLLIElement | null | undefined = null;

  onMounted(() =>{
    listElement = container.value?.querySelector("li");
    console.log('listElementWidth = ', listElement?.clientWidth);
  });

  function scrollToNext() {
    if (container.value && listElement) {
      const dispalacement = listElement.clientWidth + 32;
      container.value.scrollBy({top: 0, left: dispalacement, behavior: "smooth"});
    } else {
      console.error("No container, or no List Element found !");
    }
  }

  function scrollToPrevious() {
    if (container.value && listElement) {
      const dispalacement = -(listElement.clientWidth + 32);
      container.value.scrollBy({top: 0, left: dispalacement, behavior: "smooth"});
    } else {
      console.error("No container, or no List Element found !");
    }
  }

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
    },    {
      author: "Steve Rogers",
      content: "Wynająłem Porshe 911 na weekend i to było niesamowite doświadczenie! Auto w perfekcyjnym...."
    }
  ];
</script>

<template>
  <div class="overflow-hidden" ref="container">
    <ul class="flex gap-8 my-2">
      <li v-for="(opinion, index) in customerOpinions" class="min-w-xs basis-[calc(1/3_*_(100%_-_64px))] shrink-0 grow">
        <OpinionCard :author="opinion.author">
          {{ opinion.content }}
        </OpinionCard>
      </li>
    </ul>
  </div>
  <div class="flex justify-between my-8 mx-12 text-neutral-700">
    <button type="button" @click="scrollToPrevious">
        <span class="text-2xl mr-2">&#8592;</span>
        <span class="text-lg">Previous</span>
      </button>
      <button type="button" @click="scrollToNext">
        <span class="text-lg">Next</span>
        <span class="text-2xl ml-2">&#8594;</span>
      </button>
  </div>
</template>