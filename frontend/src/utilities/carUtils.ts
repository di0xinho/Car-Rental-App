import { Car } from "./models/carModel";
import type { CarPreferences, CarData } from "./models/carModel";

export async function getCarsByPreferences (
  preferences: Partial<CarPreferences>,
  page: number,
  limit: number
) {
  const {carMaker, bodyType, minCapacity, maxPrice, fuelType, gearboxType, minYear, maxMileage} = preferences;
  
  const params = new URLSearchParams();

  if (carMaker) carMaker.forEach((maker) => params.append('make', maker));
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
  const response = await fetch(url);
  const responseData = await response.json();
  if (!responseData.success) {
    throw new Error(responseData.error);
  }
  return responseData as {success: boolean, message: string, data: Car[]}
}

export async function createCar (newCar: CarData) {
  const url = import.meta.env.VITE_API_CREATE_CAR;
  const response = await fetch(url, { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newCar),
    credentials: 'include'
  });
  const responseData = await response.json();
  console.log('createCar response data: ', responseData);
  if (!responseData.success) {
    throw new Error(responseData.error);
  }
  return responseData as {success: boolean, message: string, data: Car};
}

export async function updateCar (carId: string, updatedCar: CarData) {
  const url = import.meta.env.VITE_API_UPDATE_CAR + carId;
  const response = await fetch(url, { 
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedCar),
    credentials: 'include'
  });
  const responseData = await response.json();
  console.log('updateCar response data: ', responseData);
  if (!responseData.success) {
    throw new Error(responseData.error);
  }
  return responseData as {success: boolean, message: string, data: Car};
}

export async function deleteCar (carId: string) {
  const url = import.meta.env.VITE_API_DELETE_CAR + carId;
  const response = await fetch(url, { 
    method: 'DELETE',
    credentials: 'include'
  });
  const responseData = await response.json();
  console.log('deleteCar response data: ', responseData);
  if (!responseData.success) {
    throw new Error(responseData.error);
  }
  return responseData as {success: boolean, message: string, data: Car};
}

export async function getFavoriteCars () {
  const url = import.meta.env.VITE_API_GET_FAVORITE_CARS;
  const response = await fetch(url, { 
    method: 'GET',
    credentials: 'include'
  });
  const responseData = await response.json();
  if (!responseData.success) {
    throw new Error(responseData.error);
  }
  return responseData as {success: boolean, message: string, favoriteCars: Car[]};
}

export async function toggleCarFavorite (carId: string) {
  //  Important!!! Anylysis of endpoint "car/add-to-favorites/:carId" shows that this endpoint also removes car from favorites array if car is already present in the array. So I name this function toggleCarFavorite !!!
  const url = import.meta.env.VITE_API_TOGGLE_CAR_FAVORITE + carId;
  const response = await fetch(url, { 
    method: 'PATCH',
    credentials: 'include'
  });
  const responseData = await response.json();
  if (!responseData.success) {
    throw new Error(responseData.error);
  }
  return responseData as {success: boolean, message: string, favoriteCars: string[]};
}