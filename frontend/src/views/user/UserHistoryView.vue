<script setup lang="ts">
  import { getAllRents } from '@/utilities/rentUtilis';
  import { Rent } from '@/utilities/models/rentModel';
  import { ref, onMounted, computed } from 'vue';
  import RentDetails from '@/components/rent-details/RentDetails.vue';

  const rents = ref<Rent[]>([]);

  const selectedRentIndex = ref<number|null>(null);
  const selectedRent = computed(() => {
    if (rents.value.length > 0 && selectedRentIndex.value !== null) {
      return rents.value[selectedRentIndex.value]
    } else {
      return null;
    }
  })

  onMounted(async() => {
    try {
      rents.value = getAllRents();
    } catch (error) {
      console.error(error);
    }
  });
</script>

<template>
  <section class="min-h-full flex flex-col gap-8 p-4 xl:p-8">
    <div class="border border-gray-300 rounded-lg overflow-hidden">
      <table class="table-fixed w-full text-sm xs:text-base">
        <colgroup>
          <col class="w-32 hidden lg:table-column"/>
          <col class="w-26 xs:w-32"/>
          <col class="w-20 xs:w-26"/>
          <col class="w-20 xs:w-26"/>
          <col class="hidden sm:table-column sm:w-16"/>
          <col class="w-7 sm:w-16"/>
        </colgroup>
        <thead class="text-left">
          <tr class="bg-gray-100">
            <th class="hidden lg:table-cell font-medium py-2 px-1 xs:px-2">ID</th>
            <th class="font-medium py-2 px-1 xs:px-2">Samochód</th>
            <th class="font-medium py-2 px-1 xs:px-2">Od</th>
            <th class="font-medium py-2 px-1 xs:px-2">Do</th>
            <th class="hidden sm:table-cell font-medium py-2 px-1 xs:px-2">Cena</th>
            <th class="font-medium py-2 px-1 xs:px-2">
              <span class="hidden sm:inline">Status</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(rent, index) in rents" class="border-t border-gray-300 bg-light-bg cursor-pointer" @click="selectedRentIndex = index" :class="[selectedRentIndex === index ? 'bg-dominant-secondary' : 'bg-light-bg']">
            <td class="hidden lg:table-cell overflow-hidden text-ellipsis py-2 px-2">{{ rent._id }}</td>
            <td class="py-2 px-1 xs:px-2">{{ rent.car.make + " " + rent.car.model }}</td>
            <td class="py-2 px-1 xs:px-2">{{ rent.rentPeriod.start }}</td>
            <td class="py-2 px-1 xs:px-2">{{ rent.rentPeriod.end }}</td>
            <td class="hidden sm:table-cell py-2 px-1 xs:px-2">{{ rent.payment }}</td>
            <td class="py-2 px-1 xs:px-2">
              <span v-if="rent.status === 'complete'">&#10004;</span>
              <svg v-else width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="9" r="9">
                  <animate
                    attributeName="fill"
                    values="#FFE5C8;#FE8400;#FFE5C8"
                    dur="3s"
                    repeatCount="indefinite"/>
                </circle>
              </svg>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="p-4 xl:p-8 bg-light-bg rounded-lg grow">
      <h3 class="text-xl xs:text-2xl my-4 mx-8">Szczegóły wynajmu</h3>
      <div v-if="selectedRent">
        <RentDetails :rent="selectedRent" />
      </div>
      <div v-else>
        <h4 class="text-center my-12">
          {{ rents.length > 0 ? 'Wybierz rezerwację z tabeli powyżej aby wyświetlić szczegóły' : 'Brak rezerwacji' }}
        </h4>
      </div>
    </div>
  </section>
</template>