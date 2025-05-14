<script setup lang="ts">
// Preferences Wizard is used to gather user preferences for API recommendation model
// Required fields should have format :
// {
  // capacity: number,
  // year: number,
  // bodyType: string,
  // gearboxType: string,
  // mileage: number,
  // fuelType: string,
  // hourlyPrice: number
// }
// After accepting preferences wizard form, user choices are saved to preferences composable and reflected in other components where user choose car characteristic eg. in filtering components
  import { ref } from 'vue';
  import StepOne from './steps/StepOne.vue';
  import StepTwo from './steps/StepTwo.vue';
  import StepThree from './steps/StepThree.vue';
  import StepIndicator from './StepIndicator.vue';

  import useCarPreferences from '@/composables/useCarPreferences';

  const { openOnStart } = defineProps({
    openOnStart: {type: Boolean, required: true}
  });

  const open = ref(openOnStart);
  const step = ref(1);

  const  { preferences, setCarPreferences, determineRecommendedCarsCluster } = useCarPreferences();

  // bodyType preference is array with multiple string possible, but recommendation model accepts single value. Therefore preferences wizard body type input is type radio with single string value
  const bodyType = ref(preferences.bodyType[0] ?? 'Sedan');
  const minCapacity = ref(preferences.minCapacity.toString());
  const maxPrice = ref(preferences.maxPrice.toString());
  const fuelType = ref(preferences.fuelType);
  const gearboxType = ref(preferences.gearboxType);
  const minYear = ref(preferences.minYear.toString());
  const maxMileage = ref(preferences.maxMileage.toString());

  const setPreferencesAndRecommendations = () => {
    const newPreferences = {
      bodyType: [bodyType.value],
      minCapacity: parseInt(minCapacity.value),
      maxPrice: parseInt(maxPrice.value),
      fuelType: fuelType.value,
      gearboxType: gearboxType.value,
      minYear: parseInt(minYear.value),
      maxMileage: parseInt(maxMileage.value)
    };
    setCarPreferences(newPreferences);
    determineRecommendedCarsCluster(newPreferences);
  }

  const openPreferencesWizard = () => {
    open.value = true;
    step.value = 1;
    // Instead of setting watcher on preferences composable, each time we open Preferences Wizard we update Wizard's ref's to actual values of preferences
    bodyType.value = preferences.bodyType[0] ?? 'Sedan'; 
    minCapacity.value = preferences.minCapacity.toString();
    maxPrice.value = preferences.maxPrice.toString();
    fuelType.value = preferences.fuelType;
    gearboxType.value = preferences.gearboxType;
    minYear.value = preferences.minYear.toString();
    maxMileage.value = preferences.maxMileage.toString();
  }
</script>

<template>
  <div class="w-full">
    <h2 class="text-2xl sm:text-4xl lg:text-5xl text-neutral-500 mb-2">
      Odpowiedz na kilka pytań.
    </h2>
    <h3 class="text-xl sm:text-3xl text-4xl text-neutral-500">
      Pozwól nam wybrać auto najlepiej dopasowane do Twoich potrzeb.
    </h3>
    <button @click="openPreferencesWizard" class="btn mt-10 text-light-txt block ml-auto">
      Zaczynamy
    </button>
  </div>
  <!-- modal window -->
  <Teleport to="body">
    <div id="modal_container" v-if="open" class="fixed top-0 w-full h-screen bg-neutral-100/75 dark:bg-neutral-900/75 z-30">
      <div id="modal_window" class="w-9/10 sm:w-4/5 max-w-288 mx-auto my-[5vh] sm:my-[10vh] h-9/10 sm:h-4/5 bg-light-bg p-4 sm:p-8 flex flex-col">
        <div class="flex gap-10 justify-between items-start mb-6 xs:mb-8 md:mb-10">
          <div>
            <h2 class="text-xl xs:text-2xl md:text-3xl">
              Odpowiedz na pytania.
            </h2>
            <h3 class="text-base xs:text-xl md:text-2xl">
              Pomóż nam przedstawić ofertę najlepiej dopasowaną do twoich potrzeb.
            </h3>
          </div>
          <button @click="open = false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L23 23M1 23C1 22.6 15.6667 8.16667 23 1" stroke="black" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <div class="xs:mx-10 md:mx-20">
          <StepIndicator :step="step"/>
        </div>
        <div id="step_one" v-if="step === 1" class="mb-auto">
          <StepOne v-model:body="bodyType" v-model:min-capacity="minCapacity" />
        </div>
        <div id="step_two" v-if="step === 2" class="mb-auto">
          <StepTwo v-model:fuel="fuelType" v-model:gearbox="gearboxType" />
        </div>
        <div id="step_three" v-if="step === 3" class="mb-auto">
          <StepThree v-model:year="minYear" v-model:mileage="maxMileage" v-model:price="maxPrice" />
        </div>
        <div class="flex flex-col md:flex-row justify-between gap-x-8 gap-y-4">
          <div class="flex justify-between grow">
            <button @click="() => {if (step > 1) step--}" class="md:py-[10px] px-4 lg:px-6">
              <span class="text-xl">&#8592;</span> Previous
            </button>
            <button @click="() => {if (step < 3) step++}" class="md:py-[10px] px-4 lg:px-6">
              Next <span class="text-xl">&#8594;</span>
            </button>
          </div>
          <button @click="setPreferencesAndRecommendations(); open = false" class="btn self-end">
            Sprawdź dostępne modele
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>