export class Car {
  constructor(
    public _id: string,
    public make: string,
    public model: string,
    public capacity: number,
    public year: number,
    public color: string,
    public bodyType: string,
    public gearboxType: string,
    public mileage: number,
    public fuelType: string,
    public hourlyPrice: number,
    public imageUrl: string,
    public description: string,
    public cluster: number,
    public bookedTimeSlots: {from: string, to:string}[],
    public isAvailable: boolean
  ) {}
}

export type CarPreferences = {
  carMaker?: string;
  bodyType: string[];
  minCapacity: number;
  maxPrice: number;
  fuelType: string;
  gearboxType: string;
  minYear: number;
  maxMileage: number;
}

export type CarData = Pick<Car, "make" | "model" | "capacity" | "year" | "color" | "bodyType" | "gearboxType" | "mileage" | "fuelType" | "hourlyPrice" | "imageUrl" | "description">;

export const carBodyTypes = ['Sport', 'SUV', 'Crossover', 'Sedan', 'Coupe', 'Hatchback'];

export const fuelTypes = ['Benzyna', 'Gaz', 'Diesel', 'Hybryda', 'Elektryczny'];

export const carMakers = ['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Toyota', 'Volkswagen'];

export const carColors = ['Biały', 'Czarny', 'Szary', 'Srebrny', 'Brązowy', 'Czerwony', 'Bordowy', 'Zielony', 'Fioletowy', 'Niebieski', 'Granatowy', ' Żółty', 'Pomarańczowy', 'Beżowy'];