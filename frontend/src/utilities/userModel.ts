import { Car } from "./carModel";

export class User {
  constructor (
    public name: string,
    public email: string,
    public firstName: string,
    public surname: string,
    public phoneNumber: number,
    public dateOfBirth: string,
    public gender: string,
    public favorites: Car[]
  ) {}
}
