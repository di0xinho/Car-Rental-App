export class User {
  constructor (
    public _id: string,
    public username: string,
    public firstName: string,
    public surname: string,
    public email: string,
    public phoneNumber: string,
    public address: string,
    public dateOfBirth: string,
    public gender: string,
    public isAdmin: boolean,
    public favorites: string[],
    public avatar: string,
    public recommended_cluster: number
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
