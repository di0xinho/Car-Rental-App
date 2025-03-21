import { reactive } from "vue";
import type { CarPreferences } from "@/utilities/carModel";

const preferences: CarPreferences = reactive({
  bodyType: [],
  capacity: 4,
  price: 400,
  fuelType: 'benzyna',
  gearboxType: 'manual',
  year: 2020,
  mileage: 100000,
})

function setCarPreferences (newPreferences: CarPreferences) {
  preferences.bodyType = newPreferences.bodyType;
  preferences.capacity = newPreferences.capacity;
  preferences.price = newPreferences.price;
  preferences.fuelType = newPreferences.fuelType;
  preferences.gearboxType = newPreferences.gearboxType;
  preferences.year = newPreferences.year;
  preferences.mileage = newPreferences.mileage;
}

export default function useCarPreferences() {
  return {
    preferences,
    setCarPreferences
  };
} 