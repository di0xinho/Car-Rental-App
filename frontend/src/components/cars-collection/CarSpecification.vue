<script setup lang="ts">
  import type { PropType } from 'vue';
  import CapacitySvg from '../icons/car-details/CapacitySvg.vue';
  import ColorSvg from '../icons/car-details/ColorSvg.vue';
  import FuelSvg from '../icons/car-details/FuelSvg.vue';
  import GearboxSvg from '../icons/car-details/GearboxSvg.vue';
  import MileageSvg from '../icons/car-details/MileageSvg.vue';
  import YearSvg from '../icons/car-details/YearSvg.vue';
  import { Car } from '@/utilities/models/carModel';

  defineProps({
    car: {type: Object as PropType<Car>, required: true}
  });

</script>

<template>
  <dl class="grid grid-cols-[repeat(auto-fill,_minmax(152px,_1fr))] gap-4">
    <div class="p-4 xl:p-6 bg-light-secondary-bg rounded-xl">
      <dt>
        <GearboxSvg class="w-6 h-6"/>
        <span class="block mt-4 mb-2 font-medium">Skrzynia biegów</span>
      </dt>
      <dd class="text-neutral-500">{{ car.gearboxType }}</dd>
    </div>
    <div class="p-4 xl:p-6 bg-light-secondary-bg rounded-xl">
      <dt>
        <FuelSvg class="w-6 h-6"/>
        <span class="block mt-4 mb-2 font-medium">Paliwo</span>
      </dt>
      <dd class="text-neutral-500">{{ car.fuelType }}</dd>
    </div>
    <div class="p-4 xl:p-6 bg-light-secondary-bg rounded-xl">
      <dt>
        <CapacitySvg class="w-6 h-6"/>
        <span class="block mt-4 mb-2 font-medium">Ilość miejsc</span>
      </dt>
      <dd class="text-neutral-500">{{ car.capacity }}</dd>
    </div>
    <div class="p-4 xl:p-6 bg-light-secondary-bg rounded-xl">
      <dt>
        <MileageSvg class="w-6 h-6"/>
        <span class="block mt-4 mb-2 font-medium">Przebieg</span>
      </dt>
      <dd class="text-neutral-500">{{ car.mileage }}</dd>
    </div>
    <div class="p-4 xl:p-6 bg-light-secondary-bg rounded-xl">
      <dt>
        <ColorSvg class="w-6 h-6"/>
        <span class="block mt-4 mb-2 font-medium">Kolor</span>
      </dt>
      <dd class="text-neutral-500">{{ car.color }}</dd>
    </div>
    <div class="p-4 xl:p-6 bg-light-secondary-bg rounded-xl">
      <dt>
        <YearSvg class="w-6 h-6"/>
        <span class="block mt-4 mb-2 font-medium">Rocznik</span>
      </dt>
      <dd class="text-neutral-500">{{ car.year }}</dd>
    </div>
  </dl>
</template>