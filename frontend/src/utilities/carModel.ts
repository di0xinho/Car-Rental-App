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
    public dailyPrice: number,
    public imageUrl: string,
    public description: string,
    public bookedTimeSlots: {from: string, to:string}[],
    public isAvailable: boolean,
  ) {}
}