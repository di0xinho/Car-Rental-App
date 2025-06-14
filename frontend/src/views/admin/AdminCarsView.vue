<script setup lang="ts">
  import { Car } from '@/utilities/models/carModel';
  import { ref, onMounted, computed, useTemplateRef } from 'vue';
  import { getCarsByPreferences } from '@/utilities/carUtils';
  import ListPaginator from '@/components/paginator/ListPaginator.vue';
  import CarsTable from '@/components/admin/cars/CarsTable.vue';
  import CarMakerSelect from '@/components/filter-panels/filters/CarMakerSelect.vue';
  import PriceFilter from '@/components/filter-panels/filters/PriceFilter.vue';
  import FuelTypeSelect from '@/components/filter-panels/filters/FuelTypeSelect.vue';
  import CarDetailsCard from '@/components/cars-collection/CarDetailsCard.vue';
  import DeleteCarModal from '@/components/admin/cars/DeleteCarModal.vue';
  import PenSvg from '@/components/icons/PenSvg.vue';
  import { RouterLink } from 'vue-router';

  const cars = ref<Car[]>([]);
  const selectedCarIndex = ref<number|null>(null);
  const page = ref(1);
  const totalPages = ref(1);

  const selectedCar = computed(() => {
    if(cars.value.length > 0 && selectedCarIndex.value !== null ) {
      return cars.value[selectedCarIndex.value];
    } else {
      return null;
    }
  });

  // filters refs
  const maker = ref<string[]>([]);
  const fuel = ref<string>('Benzyna');
  const maxPrice = ref<string>('120');

  const descriptionRef = useTemplateRef('description');
  const isLongDescription = computed(() => {
    if (descriptionRef.value) return descriptionRef.value.scrollHeight > 248;
  });
  const shortenDescription = ref(true);

  async function getCars () {
    try {
      const carsData = await getCarsByPreferences({
        carMaker: maker.value,
        fuelType: fuel.value,
        maxPrice: parseInt(maxPrice.value)
      }, page.value, 12);
      cars.value = carsData.cars;
      totalPages.value = carsData.numOfPages;
      selectedCarIndex.value = null;
    } catch (error) {
      console.error(error);
    }
  }

  onMounted (async () => {
    await getCars();
  });

  async function filterCars() {
    page.value = 1;
    getCars();
  }

  async function handleChangePage (event: number) {
    page.value = event;
    getCars();
  }
</script>

<template>
  <div class="flex justify-between items-center mx-8 lg:mx-16 my-16">
    <h1 class="text-xl xs:text-2xl">Samochody</h1>
    <RouterLink :to="{name: 'admin-add-car'}" class="flex gap-4 items-center">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 1V19M1 10C1.4 10 13.1667 10 19 10" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      <span>dodaj nowy</span>
    </RouterLink>
  </div>
  <!-- Car Filters -->
  <div class="mx-8 my-16">
    <form @submit.prevent="filterCars">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 lg:gap-16">
        <div class="w-full">
          <h3 class="text-sm text-neutral-600 my-2 md:my-4">MARKA</h3>
          <CarMakerSelect v-model:maker="maker" />
        </div>
        <div class="w-full">
          <h3 class="text-sm text-neutral-600 my-2 md:my-4">RODZAJ PALIWA</h3>
          <FuelTypeSelect v-model:fuel="fuel" />
        </div>
        <div class="w-full">
          <h3 class="text-sm text-neutral-600 my-2 md:my-4">CENA</h3>
          <PriceFilter v-model:price="maxPrice" />
        </div>
      </div>
      <button type="submit" class="block w-max btn my-8 ml-auto">
        Pokaż dostępne samochody
      </button>
    </form>
  </div>
  <!-- Cars table with Pagination -->
  <section class="mx-8 my-16">
    <div class="border border-gray-300 rounded-lg overflow-hidden">
      <CarsTable :cars="cars" :selected-car-index="selectedCarIndex" @select-car-index="selectedCarIndex = $event"/>
    </div>
    <div class="my-8">
      <ListPaginator :active-page="page" :total-pages="totalPages" @change-page="handleChangePage"/>
    </div>
  </section>
  <!-- Selected Car details -->
  <section class="mx-8 my-16 p-4 xl:p-8 bg-light-bg rounded-lg">
    <div class="flex justify-between my-8 mx-8">
      <h2 class="text-xl xs:text-2xl">Parametry samochodu</h2>
      <div v-if="selectedCar" class="flex gap-8">
        <RouterLink :to="{name: 'admin-edit-car', params: {id: selectedCar._id}}" class="flex gap-2">
          <PenSvg />
          <span>Edytuj</span>
        </RouterLink>
        <DeleteCarModal :car="selectedCar" @deleted="getCars"/>
      </div>
    </div>
    <div v-if="selectedCar" class="flex flex-col md:flex-row gap-4 md:gap-8">
      <div class="min-w-xs max-w-lg w-full mx-auto md:w-2/5">
        <CarDetailsCard :car="selectedCar"/>
      </div>
      <div class="min-w-xs md:w-3/5">
        <dl class="overflow-hidden" :class="{'max-h-56': isLongDescription && shortenDescription}" ref="description" :key="selectedCar._id">
          <dt class="text-neutral-600 mb-2">OPIS</dt>
          <dd class="text-justify">{{ selectedCar.description }}</dd>
        </dl>
        <button v-show="isLongDescription" @click="shortenDescription = !shortenDescription">
          <span class="mr-4" v-show="shortenDescription">...</span>
          <span class="text-sm text-sky-800">
            {{ shortenDescription ? '(rozwiń opis)' : '(zwiń opis)' }}
          </span>
        </button>
      </div>
    </div>
    <div v-else class="h-40">
      <h3 class="text-center my-24">Nie wybrano samochodu</h3>
    </div>
  </section>
</template>