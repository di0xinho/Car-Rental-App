<script setup lang="ts">
  import CarForm from '@/components/admin/CarForm.vue';
  import { Car, type CarData } from '@/utilities/models/carModel';
  import { updateCar, getCarById } from '@/utilities/carUtils';
  import { onMounted, ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';

  const status = ref<'pending'|'missing'|'edit'|'success'|'error'>('pending');

  const car = ref<Car|null>(null);

  const make = ref('');
  const model = ref('');
  const capacity = ref<number>();
  const year = ref<number>();
  const color = ref('');
  const bodyType = ref('');
  const gearboxType = ref('');
  const mileage = ref<number>();
  const fuelType = ref('');
  const hourlyPrice = ref<number>();
  const imageUrl = ref('');
  const description = ref('');

  const route = useRoute();
  const router = useRouter();

  function populateFormWithCarData (car: Car) {
    make.value = car.make;
    model.value = car.model
    capacity.value = car.capacity;
    year.value = car.year;
    color.value = car.color;
    bodyType.value = car.bodyType;
    gearboxType.value = car.gearboxType;
    mileage.value = car.mileage;
    fuelType.value = car.fuelType;
    hourlyPrice.value = car.hourlyPrice;
    imageUrl.value = car.imageUrl;
    description.value = car.description;
  }

  onMounted(async () => {
    try {
      const result = await getCarById(route.params.id as string);
      car.value = result.data;
      populateFormWithCarData(car.value);
      status.value = 'edit';
    } catch (error) {
      console.error(error);
      status.value = 'missing';
    }
  });

  async function handleUpdateCar () {
    const updatedCarData: CarData = {
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
      console.log('handleUpdateCar car data:', updatedCarData);
      if (car.value) {
        const result = await updateCar(car.value._id, updatedCarData);
        console.log('handleUpdateCar result:', result);
        car.value = result.data;
        return status.value = 'success';
      } else {
        console.error('Car object is missing! Unable to proceed updating operation!');
        return status.value = 'missing';
      }
    } catch (error) {
      console.error(error);
      status.value = 'error';
    }
  }
</script>

<template>
  <div class="mx-8 lg:mx-16 my-16 flex justify-between">
    <h1 class="text-xl xs:text-2xl">Edytuj samochód</h1>
    <button @click="$router.back">
      <span class="text-xl mx-2">&#10229;</span>
      <span>Powrót</span>
    </button>
  </div>
  <!-- Edit form -->
  <section v-if="status === 'edit'" class="mx-8 my-16 border border-gray-300 bg-gray-100 p-8 rounded-lg">
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
      @submit.prevent="handleUpdateCar"
    />
    <div class="mt-8 w-max ml-auto">
      <button type="submit" form="car-form" class="btn">ZAKTUALIZUJ PARAMETRY SAMOCHODU</button>
    </div>
  </section>
  <!-- Car doesn't exist -->
  <div v-if="status === 'missing'" class="max-w-2xl p-8 mx-auto my-32">
    <h2 class="text-center text-lg xs:text-2xl">
      <span>Nie znaleziono samochodu </span>
      <span class="font-medium inline-block"> ID: {{ $route.params.id }}</span>
    </h2>
    <RouterLink :to="{name: 'admin-cars'}" class="block w-max mt-8 ml-auto text-sky-800">
      <span class="text-xl mx-2">&#10229;</span>
      <span>Lista samochodów</span>
    </RouterLink>
  </div>
  <!-- Error on update -->
  <div v-if="status === 'error'" class="max-w-2xl p-8 mx-auto my-32">
    <h2 class="text-center text-lg xs:text-2xl">
      <span>Wystąpił błąd! Nie udało się zaktualizować danych samochodu </span>
      <span class="font-medium inline-block"> ID: {{ $route.params.id }}</span>
    </h2>
    <RouterLink :to="{name: 'admin-cars'}" class="block w-max mt-8 ml-auto text-sky-800">
      <span class="text-xl mx-2">&#10229;</span>
      <span>Lista samochodów</span>
    </RouterLink>
  </div>
  <!-- Successful update -->
  <div v-if="status === 'success'" class="max-w-2xl p-8 mx-auto my-32">    
    <h2 class="text-center text-lg xs:text-2xl">
      <span>Sukces! Zaktualizowano dane samochodu </span>
      <span class="font-medium inline-block"> ID: {{ $route.params.id }}</span>
    </h2>
    <RouterLink :to="{name: 'admin-cars'}" class="block w-max mt-8 ml-auto text-sky-800">
      <span class="text-xl mx-2">&#10229;</span>
      <span>Lista samochodów</span>
    </RouterLink></div>
</template>