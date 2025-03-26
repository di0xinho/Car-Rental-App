<script setup lang="ts">
  import { ref } from 'vue';
  import StepOne from './steps/StepOne.vue';
  import StepTwo from './steps/StepTwo.vue';
  import StepThree from './steps/StepThree.vue';
  import StepIndicator from './StepIndicator.vue';

  import useCarPreferences from '@/composables/useCarPreferences';

  const open = ref(true);
  const step = ref(1);

  const  { preferences, setCarPreferences } = useCarPreferences();

  const bodyType = ref(preferences.bodyType); 
  const capacity = ref(preferences.capacity.toString());
  const price = ref(preferences.price.toString());
  const fuelType = ref(preferences.fuelType);
  const gearboxType = ref(preferences.gearboxType);
  const year = ref(preferences.year.toString());
  const mileage = ref(preferences.mileage.toString());

  const setNewCarPreferences = () => {
    setCarPreferences({
      bodyType: bodyType.value,
      capacity: parseInt(capacity.value),
      price: parseInt(price.value), 
      fuelType: fuelType.value,
      gearboxType: gearboxType.value,
      year: parseInt(year.value),
      mileage: parseInt(mileage.value)
    });
  }

  const openPreferencesWizard = () => {
    open.value = true;
    step.value = 1;
  }
</script>

<template>
  <div class="p-18 bg-card-bg">
    <h2 class="text-5xl text-neutral-500 mb-2">
      Odpowiedz na kilka pytań.
    </h2>
    <h3 class="text-4xl text-neutral-500">
      Pozwól nam wybrać auto najlepiej dopasowane do Twoich potrzeb.
    </h3>
    <button @click="openPreferencesWizard" class="py-3 px-6 mt-10 bg-dominant-primary text-neutral-50 block ml-auto rounded-sm">
      Zaczynamy
    </button>
  </div>
  <!-- modal window -->
  <Teleport to="body">
    <div id="modal_container" v-if="open" class="fixed top-0 w-screen h-screen bg-neutral-100/75 z-30">
      <div id="modal_window" class="w-4/5 max-w-288 mx-auto my-[10vh] h-4/5 bg-page-light-bg p-8 flex flex-col">
        <div class="flex gap-10 justify-between items-start mb-10">
          <div>
            <h2 class="text-3xl">
              Odpowiedz na pytania.
            </h2>
            <h3 class="text-2xl">
              Pomóż nam przedstawić ofertę najlepiej dopasowaną do twoich potrzeb.
            </h3>
          </div>
          <button @click="open = false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L23 23M1 23C1 22.6 15.6667 8.16667 23 1" stroke="black" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <div class="mx-20">
          <StepIndicator :step="step"/>
        </div>
        <div id="step_one" v-if="step === 1" class="mb-auto">
          <StepOne v-model:body="bodyType" v-model:capacity="capacity" />
        </div>
        <div id="step_two" v-if="step === 2" class="mb-auto">
          <StepTwo v-model:fuel="fuelType" v-model:gearbox="gearboxType" />
        </div>
        <div id="step_three" v-if="step === 3" class="mb-auto">
          <StepThree v-model:year="year" v-model:mileage="mileage" v-model:price="price" />
        </div>
        <div class="flex justify-between">
          <div>
            <button @click="() => {if (step > 1) step--}" class="py-[10px] px-6 mr-40">
              <span class="text-xl">&#8592;</span> Previous
            </button>
            <button @click="() => {if (step < 3) step++}" class="py-[10px] px-6">
              Next <span class="text-xl">&#8594;</span>
            </button>
          </div>
          <button @click="setNewCarPreferences(); open = false" class="py-3 px-6 bg-dominant-primary text-center rounded-sm self-end">
            Sprawdź dostępne modele
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>