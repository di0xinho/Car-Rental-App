import { Car } from "./models/carModel";
import type { CarPreferences } from "./models/carModel";

export async function getCarsByPreferences (
  preferences: Partial<CarPreferences>,
  page: number,
  limit: number
) {
  const {bodyType, minCapacity, maxPrice, fuelType, gearboxType, minYear, maxMileage} = preferences;
  
  const params = new URLSearchParams();

  if (bodyType) bodyType.forEach((type) => params.append('bodyType', type));
  if (minCapacity) params.append('minCapacity', minCapacity.toString());
  if (maxPrice) params.append('maxPrice', maxPrice.toString());
  if (fuelType) params.append('fuelType', fuelType);
  if (gearboxType) params.append('gearboxType', gearboxType);
  if (minYear) params.append('minYear', minYear.toString());
  if (maxMileage) params.append('maxMileage', maxMileage.toString());
  if (page) params.append('page', page.toString());
  if (limit) params.append('limit', limit.toString());

  const url = import.meta.env.VITE_API_GET_CARS + '?' + params;
  console.log('New request to: ', url);
  const response = await fetch(url);
  const responseData = await response.json();
  if (!responseData.success) {
    throw new Error(responseData.error);
  }
  return responseData as {message: string, success: boolean, cars: Car[], currentPage: number, numOfPages: number}
};

export async function getCarById (id: string) {
  const url = import.meta.env.VITE_API_GET_CAR_BY_ID + id;
  const response = await fetch(url);
  const responseData = await response.json();
  if (!responseData.success) {
    throw new Error(responseData.error);
  }
  return responseData as {message: string, success: boolean, data: Car}
}

export async function getRecommendedCars (clusterId?: number) {
  if (!clusterId) clusterId = 0;
  const url = import.meta.env.VITE_API_GET_RECOMMENDED_CARS + clusterId.toString();
  console.log('fetching recommended cars from: ', url);
  const response = await fetch(url);
  const responseData = await response.json();
  if (!responseData.success) {
    throw new Error(responseData.error);
  }
  return responseData as {success: boolean, message: string, data: Car[]}
}

export function getCarTelemetryData () {
  return {
    position: { lat: 51.113763, lng: 17.004502 },
    mileage: 549941
  }
}