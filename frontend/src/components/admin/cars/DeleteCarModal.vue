<script setup lang="ts">
  import { ref, type PropType, computed } from 'vue';
  import { Car } from '@/utilities/models/carModel';
  import BinSvg from '@/components/icons/BinSvg.vue';
  import CarDetailsCard from '@/components/cars-collection/CarDetailsCard.vue';
  import { deleteCar } from '@/utilities/carUtils';

  const { car } = defineProps({ car: {type: Object as PropType<Car>, required: true} });
  const emit = defineEmits(['deleted']);

  const open = ref(false);
  const status = ref<'pending'|'delete'|'success'|'error'>('delete');
  
  const confirmId = ref('');
  const confirmed = computed(() => (confirmId.value ===  car._id.slice(-4)));

  function openModal () {
    open.value = true;
    status.value = 'delete';
    confirmId.value = '';
  }

  function closeModal () {
    open.value = false;
    if (status.value === 'success') {
      return emit('deleted');
    }
  }

  async function handleDeleteCar () {
    try {
      status.value = 'pending';
      const result = await deleteCar(car._id);
      console.log(result.message);
      status.value = 'success';
    } catch (error) {
      console.error(error);
      status.value = 'error';
    }
  }
</script>

<template>
  <button type="button" @click="openModal" class="flex gap-2">
    <BinSvg />
    <span>Usuń</span>
  </button>
  <Teleport to="body">
    <div id="modal-container" v-if="open" class="fixed top-0 w-full h-screen bg-neutral-100/75 dark:bg-neutral-900/75 z-30">
      <div id="modal_window" class="w-9/10 max-w-xl mx-auto my-[5vh] sm:my-[10vh] h-9/10 sm:h-4/5 bg-light-bg p-4 sm:p-8 flex flex-col gap-4">
        <button @click="closeModal" class="ml-auto">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L23 23M1 23C1 22.6 15.6667 8.16667 23 1" stroke="black" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        <!-- Confirmation form -->
        <section v-if="status === 'delete'" class="h-full flex flex-col justify-between gap-4">
          <header>
            <h2 class="text-lg xs:text-2xl">
              Czy napewno chcesz usunąć ten samochód z&nbsp;listy samochodów ?
            </h2>
            <h4 class="text-sm xs:text-base text-neutral-500 font-light">
              ( Operacja nie może zostać cofnięta )
            </h4>
          </header>
          <div>
            <CarDetailsCard :car="car"/>
            <h3 class="mt-4">ID samochodu: {{ car._id }}</h3>
          </div>
          <div>
            <form id="confirmation" @submit.prevent="handleDeleteCar">
              <label for="confirm-id" class="block mb-2">
                Wpisz 4 ostatnie znaki ID samochodu aby usunąć samochód z listy
              </label>
              <input type="text" id="confirm-id" v-model="confirmId" placeholder="Podaj 4 ostanie cyfry ID" class="bg-light-secondary-bg w-full outline-none rounded-lg p-4">
            </form>
            <div class="mt-4 flex gap-8 justify-between">
              <button type="button" @click="open = false">
                <span class="text-xl mx-2">&#10229;</span>
                <span>Anuluj</span>
              </button>
              <button type="submit" form="confirmation" :disabled="!confirmed" class="btn">
                Usuń
              </button>
            </div>
          </div>
        </section>
        <!-- Delete success message-->
        <section v-if="status === 'success'" class="my-auto">
          <h2 class="text-lg xs:text-2xl">
            <span>Usunięto samochód </span>
            <span class="font-medium inline-block"> {{ car.make + " " + car.model }} </span>
            <span class="font-medium inline-block"> (id: {{ car._id }}) </span>
            <span> z&nbsp;listy samochodów</span>
          </h2>
        </section>
        <!-- Delete error message -->
        <section v-if="status === 'error'" class="my-auto">
          <h2 class="text-lg xs:text-2xl">
            <span>Nie udało się usunąć samochodu </span>
            <span class="font-medium inline-block"> {{ car.make + " " + car.model }} </span>
            <span class="font-medium inline-block"> (id: {{ car._id }}) </span>
            <span> z&nbsp;listy samochodów</span>
          </h2>
        </section>
      </div>
    </div>
  </Teleport>
</template>