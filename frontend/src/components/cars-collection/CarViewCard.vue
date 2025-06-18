<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { Car } from '@/utilities/models/carModel';
  import { computed, type PropType } from 'vue';
  import HeartSvg from '../icons/HeartSvg.vue';
  import { toggleCarFavorite } from '@/utilities/carUtils';
  import useUser from '@/composables/useUser';

  const props = defineProps({
    car: {type: Object as PropType<Car>, required: true},
    cardBackground: {type: String},
  });

  const emit = defineEmits<{
    removedFromFavorites: [carId: string]
    addedToFavorites: [carId: string]
  }>();

  const { user, setUserFavorites } = useUser();

  const isFavorite = computed(() => {
    return user.value?.favorites.includes(props.car._id);
  });

  async function handleToogleCarFavorite() {
    try {
      // Operation type flag: 0 - removing car from list, 1 - adding car to list
      const oerationType = isFavorite.value ? 0 : 1;
      const result = await toggleCarFavorite(props.car._id);
      setUserFavorites(result.favoriteCars);
      if (oerationType) {
        emit('addedToFavorites', props.car._id);
      } else {
        emit('removedFromFavorites', props.car._id);
      }
    } catch (error) {
      console.error(error);
    }
  }
</script>

<template>
  <div class="relative card min-w-2xs" :class="cardBackground ?? ''">
    <button v-if="user" type="button" @click="handleToogleCarFavorite" class="group absolute top-4 right-4 flex items-start">
      <div class="hidden group-hover:block relative top-5 -right-2">
        <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="ml-auto mr-3">
          <path d="M22 0L19 15H0L22 0Z" fill="#FFFFFFCC"/>
        </svg>
        <span class="bg-[#FFFFFFCC] block text-sm px-4 py-1 rounded-md">
          {{isFavorite ? 'usuń z ulubionych' : 'dodaj do ulubionych'}}
        </span>
      </div>
      <HeartSvg stroke="#D25021" :fill="isFavorite ? '#D25021' : 'none'" />
    </button>
    <img 
      :src="car.imageUrl"
      alt="car in our offer"
      class="w-full min-h-56 aspect-3/2 object-cover"
    >
    <div class="flex justify-between m-4">
      <div>
        <h4 class="text-xl font-semibold">
          {{ car.make + " " + car.model }}
        </h4>
        <h5 class="text-sm text-neutral-500">{{ car.bodyType }}</h5>
      </div>
      <div>
        <h4 class="text-xl font-semibold text-dominant-primary text-right">
          {{ car.hourlyPrice}} ZŁ
        </h4>
        <h5 class="text-sm text-neutral-500">za godzinę</h5>
      </div>
    </div>
    <div class="flex justify-between m-4 ">
      <div>
        <h6>{{ car.gearboxType }}</h6>
      </div>
      <div>
        <h6>{{ car.fuelType }}</h6>
      </div>
      <div>
        <h6>{{ car.capacity }} {{ car.capacity < 5 ? "Osoby" : "Osób" }}</h6>
      </div>
    </div>
    <RouterLink :to="{name: 'car-details', params: {id: car._id}}" class="m-4 btn text-light-txt">
      Zobacz szczegóły
    </RouterLink>
  </div>
</template>