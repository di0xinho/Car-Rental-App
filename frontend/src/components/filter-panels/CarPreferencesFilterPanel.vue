<script setup lang="ts">
  import { ref, watch } from 'vue';
  import BodyTypeFilter from './filters/BodyTypeFilter.vue';
  import CapacityFilter from './filters/CapacityFilter.vue';
  import PriceFilter from './filters/PriceFilter.vue';
  import FuelTypeFilter from './filters/FuelTypeFilter.vue';
  import GearboxFilter from './filters/GearboxFilter.vue';
  import YearFilter from './filters/YearFilter.vue';
  import MileageFilter from './filters/MileageFilter.vue';

  import useCarPreferences from '@/composables/useCarPreferences';

  const  { preferences, setCarPreferences } = useCarPreferences();

  const bodyType = ref(preferences.bodyType); 
  const minCapacity = ref(preferences.minCapacity.toString());
  const maxPrice = ref(preferences.maxPrice.toString());
  const fuelType = ref(preferences.fuelType);
  const gearboxType = ref(preferences.gearboxType);
  const minYear = ref(preferences.minYear.toString());
  const maxMileage = ref(preferences.maxMileage.toString());

  watch( preferences, (newPreferences) => {
    if (bodyType.value.toString() !== newPreferences.bodyType.toString()) {
      bodyType.value = newPreferences.bodyType;
    }
    if (minCapacity.value !== newPreferences.minCapacity.toString()) {
      minCapacity.value = newPreferences.minCapacity.toString();
    }
    if (maxPrice.value !== newPreferences.maxPrice.toString()) {
      maxPrice.value = newPreferences.maxPrice.toString();
    }
    if (fuelType.value !== newPreferences.fuelType) {
      fuelType.value = newPreferences.fuelType;
    }
    if (gearboxType.value !== newPreferences.gearboxType) {
      gearboxType.value = newPreferences.gearboxType;
    }
    if (minYear.value !== newPreferences.minYear.toString()) {
      minYear.value = newPreferences.minYear.toString();
    }
    if (maxMileage.value !== newPreferences.maxMileage.toString()) {
      maxMileage.value = newPreferences.maxMileage.toString();
    }
  });
  
  const setNewCarPreferences = () => {
    setCarPreferences({
      bodyType: bodyType.value,
      minCapacity: parseInt(minCapacity.value),
      maxPrice: parseInt(maxPrice.value),
      fuelType: fuelType.value,
      gearboxType: gearboxType.value,
      minYear: parseInt(minYear.value),
      maxMileage: parseInt(maxMileage.value)
    });
  }
</script>

<template>
  <form @submit.prevent="setNewCarPreferences" class="h-max flex flex-col gap-4">
    <div>
      <h3 class="text-sm text-neutral-600">TYP</h3>
      <BodyTypeFilter v-model:type="bodyType" class="my-8" />
    </div>
    <div>
      <h3 class="text-sm text-neutral-600">ILOŚĆ MIEJSC</h3>
      <CapacityFilter v-model:min-capacity="minCapacity" class="my-8" />
    </div>
    <div>
      <h3 class="text-sm text-neutral-600">CENA</h3>
      <PriceFilter v-model:price="maxPrice" class="my-8" />
    </div>
    <div>
      <h3 class="text-sm text-neutral-600">RODZAJ PALIWA</h3>
      <FuelTypeFilter v-model:fuel="fuelType" class="my-8" />
    </div>
    <div>
      <h3 class="text-sm text-neutral-600">SKRZYNIA BIEGÓW</h3>
      <GearboxFilter v-model:gearbox="gearboxType" class="my-8" />
    </div>
    <div>
      <h3 class="text-sm text-neutral-600">ROCZNIK</h3>
      <YearFilter v-model:year="minYear" class="my-8" />
    </div>
    <div>
      <h3 class="text-sm text-neutral-600">PRZEBIEG</h3>
      <MileageFilter v-model:mileage="maxMileage" class="my-8" />
    </div>
    <button type="submit" class="btn">
      Sprawdź dostępne modele
    </button>
  </form>
</template>