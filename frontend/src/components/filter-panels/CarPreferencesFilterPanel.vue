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
  <form @submit.prevent="setNewCarPreferences" class="flex flex-col gap-2">
    <div>
      <BodyTypeFilter v-model:type="bodyType" />
    </div>
    <div>
      <CapacityFilter v-model:min-capacity="minCapacity" />
    </div>
    <div>
      <PriceFilter v-model:price="maxPrice" />
    </div>
    <div>
      <FuelTypeFilter v-model:fuel="fuelType" />
    </div>
    <div>
      <GearboxFilter v-model:gearbox="gearboxType" />
    </div>
    <div>
      <YearFilter v-model:year="minYear" />
    </div>
    <div>
      <MileageFilter v-model:mileage="maxMileage" />
    </div>
    <button type="submit" class="btn">
      Sprawdź dostępne modele
    </button>
  </form>
</template>