
<script setup lang="ts">
	// Horizontal list with shifting elements in view by clicking next/previous button
	import { onMounted, useTemplateRef } from 'vue';

	const container = useTemplateRef('container');
	let listElement: HTMLLIElement | null | undefined = null;

	onMounted(() =>{
		listElement = container.value?.querySelector("li");
		console.log('listElementWidth = ', listElement?.clientWidth);
	});

	function scrollToNext() {
		if (container.value && listElement) {
			// Calculating displacement as element width + gap between elements
			const dispalacement = listElement.clientWidth + 32;
			container.value.scrollBy({top: 0, left: dispalacement, behavior: "smooth"});
		} else {
			console.error("No container, or no List Element found !");
		}
	}

	function scrollToPrevious() {
		if (container.value && listElement) {
			// Calculating displacement as element width + gap between elements
			const dispalacement = -(listElement.clientWidth + 32);
			container.value.scrollBy({top: 0, left: dispalacement, behavior: "smooth"});
		} else {
			console.error("No container, or no List Element found !");
		}
	}
</script>

<template>
	<div class="overflow-hidden" ref="container">
    <ul class="flex gap-8 my-2">
      <slot></slot>
    </ul>
  </div>
  <div class="flex justify-between my-8 mx-6 sm:mx-12 text-neutral-700">
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