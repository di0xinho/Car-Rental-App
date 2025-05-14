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

export default class Booking {
  constructor (
    public car: Car,
    public user: User,
    public bookedTimeSlots: { from: string, to: string },
    public totalHours: number,
    public totalPrice: number,
    public transactionId: string,
    public driver: boolean,
    public isPaid: boolean
  ) {}
}

export type CreateBookingDetails = {
  carId: string,
  totalHours: number,
  totalPrice: number,
  driver: boolean,
  bookedTimeSlots: {from: string, to: string},
  city: string,
}
