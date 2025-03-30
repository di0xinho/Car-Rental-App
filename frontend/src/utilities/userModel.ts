import { Car } from "./carModel";

export class User {
  constructor (
    public _id: string,
    public name: string,
    public email: string,
    public firstName: string,
    public surname: string,
    public phoneNumber: string,
    public dateOfBirth: string,
    public gender: string,
    public favorites: Car[],
    public avatar: string
  ) {}
}

export type UserData = {
  user_id: string,
  user_bookings: {
    booking_id: string,
    car_id: string,
    car_make: string,
    car_model: string,
    from: string,
    to: string
  },
  user_opinions: {
    opinion_id: string,
    opinion_content: string,
    opinion_date: string
  }
}
