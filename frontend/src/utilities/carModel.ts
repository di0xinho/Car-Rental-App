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
    public price: number,
    public imageUrl: string,
    public description: string,
    public bookedTimeSlots: {from: string, to:string}[],
    public isAvailable: boolean,
  ) {}
}

export type CarPreferences = {
  bodyType: string[];
  capacity: number;
  price: number;
  fuelType: string;
  gearboxType: string;
  year: number;
  mileage: number;
}

export const carBodyTypes = ['sport', 'suv', 'mpv', 'sedan', 'coupe', 'hatchback'];

export const fuelTypes = ['Benzyna', 'Gaz', 'Diesel', 'Hybryda', 'Elektryczny'];