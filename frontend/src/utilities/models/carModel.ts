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
    public bookedTimeSlots: {from: string, to:string}[],
    public isAvailable: boolean,
  ) {}
}

export type CarPreferences = {
  bodyType: string[];
  minCapacity: number;
  maxPrice: number;
  fuelType: string;
  gearboxType: string;
  minYear: number;
  maxMileage: number;
}

export const carBodyTypes = ['Sport', 'SUV', 'Crossover', 'Sedan', 'Coupe', 'Hatchback'];

export const fuelTypes = ['Benzyna', 'Gaz', 'Diesel', 'Hybryda', 'Elektryczny'];