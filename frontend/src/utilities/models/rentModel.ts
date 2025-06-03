// car: { type: mongoose.Schema.Types.ObjectID, ref: "cars" }, // Referencja do wynajmowanego auta
//     user: { type: mongoose.Schema.Types.ObjectID, ref: "users" }, // Referencja do użytkownika, który wynajął auto
//     // Data wynajmu pojazu
//     bookedTimeSlots: {
//       from: { type: String }, // Wynajem od
//       to: { type: String }, // Wynajem do
//     },
//     totalHours: { type: Number }, // Liczba godzin wynajmu
//     totalPrice: { type: Number }, // Kwota do zapłaty
//     transactionId: { type: String }, // Numer transakcji
//     driver: { type: Boolean }, // Czy wynajem obejmuje ofertę z kierowcą
//     isPaid: { type: Boolean }, // Czy wynajem został już opłacony

import { Car } from "./carModel";
import { User } from "./userModel";

export class Rent {
  constructor (
    public _id: string,
    public car: Car,
    public user: User,
    public booking: {
      _id: string,
      bookedTimeSlots: { from: string, to: string },
      totalHours: number,
      totalPrice: number,
      transactionId: string,
      driver: boolean,
      isPaid: boolean
    },
    public rentPeriod: { start: string, end: string|undefined },
    public carMileage: { atStart: number, atEnd: number|undefined },
    public payment: number,
    public status: 'active'|'complete'
  ) {}
}