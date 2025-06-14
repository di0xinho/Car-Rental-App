import { reactive, ref } from "vue";
import type { CarPreferences } from "@/utilities/models/carModel";

const preferences: CarPreferences = reactive({
  carMaker: [],
  bodyType: [],
  minCapacity: 4,
  maxPrice: 100,
  fuelType: 'Benzyna',
  gearboxType: 'Manualna',
  minYear: 2017,
  maxMileage: 200000,
});

// If there is no user, default recommended cluster is number 0 
const recommendedCarsCluster = ref(0);

function setCarPreferences (newPreferences: Partial<CarPreferences>) {
  if (newPreferences.carMaker) preferences.carMaker = newPreferences.carMaker;
  if (newPreferences.bodyType) preferences.bodyType = newPreferences.bodyType;
  if (newPreferences.minCapacity) preferences.minCapacity = newPreferences.minCapacity;
  if (newPreferences.maxPrice) preferences.maxPrice = newPreferences.maxPrice;
  if (newPreferences.fuelType) preferences.fuelType = newPreferences.fuelType;
  if (newPreferences.gearboxType) preferences.gearboxType = newPreferences.gearboxType;
  if (newPreferences.minYear) preferences.minYear = newPreferences.minYear;
  if (newPreferences.maxMileage) preferences.maxMileage = newPreferences.maxMileage;
}

function setRecommendedCarsCluster(cluster: number) {
  recommendedCarsCluster.value = cluster;
}

async function determineRecommendedCarsCluster (newPreferences: CarPreferences) {
  // prefered year is calculated as a middle value between minYear selected by user and current year
  const yearDifference = Math.floor((new Date().getFullYear() - newPreferences.minYear) / 2);
  // prefered mileage is calculated as a middle value between 50000 as min value and selected by user max mileage
  const mileageDifference = (newPreferences.maxMileage - 50000) / 2;

  const averagedPreferences = {
    // API recommendation model accepts single string value for body type (In preferences wizard body type input is type radio. Setting preferences composable from preferences wizard, body type value is writen in array of body type strings at index 0)
    bodyType: newPreferences.bodyType[0],
    capacity: newPreferences.minCapacity,
    hourlyPrice: newPreferences.maxPrice,
    fuelType: newPreferences.fuelType,
    gearboxType: newPreferences.gearboxType,
    year: newPreferences.minYear + yearDifference,
    mileage: newPreferences.maxMileage - mileageDifference
  }

  const response = await fetch(import.meta.env.VITE_API_COMPUTE_RECOMMENDATION, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(averagedPreferences),
    credentials: 'include'
  });
  if (!response.ok) {
    throw new Error('Nie udało się ustalić rekomendowanej grupy samochodów!');
  }
  const responseData = await response.json();
  recommendedCarsCluster.value = responseData.predicted_cluster;
  console.log("Recommended cluster: ", recommendedCarsCluster.value);
  return responseData.predicted_cluster as number;
}

export default function useCarPreferences() {
  return {
    preferences,
    recommendedCarsCluster,
    setCarPreferences,
    setRecommendedCarsCluster,
    determineRecommendedCarsCluster
  };
}