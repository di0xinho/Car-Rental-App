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
  const capacity = ref(preferences.capacity.toString());
  const price = ref(preferences.price.toString());
  const fuelType = ref(preferences.fuelType);
  const gearboxType = ref(preferences.gearboxType);
  const year = ref(preferences.year.toString());
  const mileage = ref(preferences.mileage.toString());

  watch( preferences, (newPreferences) => {
    if (bodyType.value.toString() !== newPreferences.bodyType.toString()) {
      bodyType.value = newPreferences.bodyType;
      console.log('bodyType changed!');
    }
    if (capacity.value !== newPreferences.capacity.toString()) {
      capacity.value = newPreferences.capacity.toString();
    }
    if (price.value !== newPreferences.price.toString()) {
      price.value = newPreferences.price.toString();
      console.log('price changed!');
    }
    if (fuelType.value !== newPreferences.fuelType) {
      fuelType.value = newPreferences.fuelType;
      console.log('fuelType changed!');
    }
    if (gearboxType.value !== newPreferences.gearboxType) {
      gearboxType.value = newPreferences.gearboxType;
    }
    if (year.value !== newPreferences.year.toString()) {
      year.value = newPreferences.year.toString();
    }
    if (mileage.value !== newPreferences.mileage.toString()) {
      mileage.value = newPreferences.mileage.toString();
    }
  });
  
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
</script>

<template>
  <form @submit.prevent="setNewCarPreferences" class="flex flex-col gap-2">
    <div>
      <BodyTypeFilter v-model:type="bodyType" />
    </div>
    <div>
      <CapacityFilter v-model:capacity="capacity" />
    </div>
    <div>
      <PriceFilter v-model:price="price" />
    </div>
    <div>
      <FuelTypeFilter v-model:fuel="fuelType" />
    </div>
    <div>
      <GearboxFilter v-model:gearbox="gearboxType" />
    </div>
    <div>
      <YearFilter v-model:year="year" />
    </div>
    <div>
      <MileageFilter v-model:mileage="mileage" />
    </div>
    <button type="submit" class="py-3 px-6 bg-dominant-primary text-center rounded-sm">
      Sprawdź dostępne modele
    </button>
  </form>
</template>