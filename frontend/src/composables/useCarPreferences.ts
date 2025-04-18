import { reactive } from "vue";
import type { CarPreferences } from "@/utilities/models/carModel";
import { Car } from "@/utilities/models/carModel";

const preferences: CarPreferences = reactive({
  bodyType: [],
  minCapacity: 4,
  maxPrice: 200,
  fuelType: 'Benzyna',
  gearboxType: 'Manualna',
  minYear: 2017,
  maxMileage: 200000,
});

function setCarPreferences (newPreferences: Partial<CarPreferences>) {
  if (newPreferences.bodyType) preferences.bodyType = newPreferences.bodyType;
  if (newPreferences.minCapacity) preferences.minCapacity = newPreferences.minCapacity;
  if (newPreferences.maxPrice) preferences.maxPrice = newPreferences.maxPrice;
  if (newPreferences.fuelType) preferences.fuelType = newPreferences.fuelType;
  if (newPreferences.gearboxType) preferences.gearboxType = newPreferences.gearboxType;
  if (newPreferences.minYear) preferences.minYear = newPreferences.minYear;
  if (newPreferences.maxMileage) preferences.maxMileage = newPreferences.maxMileage;
}

async function getCarsByPreferences ({ bodyType, minCapacity, maxPrice, fuelType, gearboxType, minYear, maxMileage, page, limit }: {bodyType?: string[], minCapacity?: string, maxPrice?: string, fuelType?: string, gearboxType?: string, minYear?: string, maxMileage?: string, page?: string, limit?: string}) {
  
  const params = new URLSearchParams();

  if (bodyType) bodyType.forEach((type) => params.append('bodyType', type));
  if (minCapacity) params.append('minCapacity', minCapacity);
  // if (maxPrice) params.append('maxPrice', maxPrice); to be fixed on backend!!!
  if (fuelType) params.append('fuelType', fuelType);
  if (gearboxType) params.append('gearboxType', gearboxType);
  if (minYear) params.append('minYear', minYear);
  if (maxMileage) params.append('maxMileage', maxMileage);
  if (page) params.append('page', page);
  if (limit) params.append('limit', limit);

  const url = import.meta.env.VITE_API_CARS_GET + '?' + params;
  console.log('New request to: ', url);
  const response = await fetch(url);
  const responseData = await response.json();
  if (!responseData.success) {
    throw new Error(responseData.error);
  }
  return responseData as {message: string, success: boolean, cars: Car[], currentPage: number, numOfPages: number}
};

export default function useCarPreferences() {
  return {
    preferences,
    setCarPreferences,
    getCarsByPreferences
  };
} 