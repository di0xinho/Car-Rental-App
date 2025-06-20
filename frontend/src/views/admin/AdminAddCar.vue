<script setup lang="ts">
  import CarForm from '@/components/admin/cars/CarForm.vue';
  import { createCar } from '@/utilities/carUtils';
  import type { CarData } from '@/utilities/models/carModel';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const make = ref('');
  const model = ref('');
  const capacity= ref<number>();
  const year = ref<number>();
  const color = ref('');
  const bodyType = ref('');
  const gearboxType = ref('');
  const mileage = ref<number>();
  const fuelType = ref('');
  const hourlyPrice = ref<number>();
  const imageUrl = ref('');
  const description = ref('');

  const router = useRouter();

  async function handleCreateCar () {
    const newCarData: CarData = {
      make: make.value,
      model: model.value,
      capacity: capacity.value!,
      year: year.value!,
      color: color.value,
      bodyType: bodyType.value,
      gearboxType: gearboxType.value,
      mileage: mileage.value!,
      fuelType: fuelType.value,
      hourlyPrice: hourlyPrice.value!,
      imageUrl: imageUrl.value,
      description: description.value
    }
    try {
      console.log('handleCreateCar:', newCarData);
      const result = await createCar(newCarData);
      router.push({name: 'admin-cars'});
    } catch (error) {
      console.error(error);
    }
  }
</script>

<template>
  <div class="mx-4 sm:mx-8 lg:mx-16 my-16 flex justify-between">
    <h1 class="text-xl xs:text-2xl">Dodaj samochód</h1>
    <button @click="$router.back">
      <span class="text-xl mx-2">&#10229;</span>
      <span>Powrót</span>
    </button>
  </div>
  <section class="mx-4 sm:mx-8 my-16 border border-gray-300 bg-gray-100 p-4 sm:p-8 rounded-lg">
    <CarForm 
      v-model:make="make"
      v-model:model="model"
      v-model:capacity="capacity"
      v-model:year="year"
      v-model:color="color"
      v-model:body-type="bodyType"
      v-model:gearbox-type="gearboxType"
      v-model:mileage="mileage"
      v-model:fuel-type="fuelType"
      v-model:hourly-price="hourlyPrice"
      v-model:image-url="imageUrl"
      v-model:description="description"
      id="car-form"
      @submit.prevent="handleCreateCar"
    />
    <button type="submit" form="car-form" class="block ml-auto mt-8 mb-4 btn">
      DODAJ NOWY SAMOCHÓD
    </button>
  </section>
</template>