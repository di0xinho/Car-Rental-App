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

export class Booking {
  constructor (
    public _id: string,
    public car: Car,
    public user: User,
    public bookedTimeSlots: { 
      from: string,
      to: string
    },
    public totalHours: number,
    public totalPrice: number,
    public transactionId: string,
    public driver: boolean,
    public isPaid: boolean,
    public rent: {
      from: string,
      to: string,
      carMileageAtStart: number,
      carMileageAtEnd: number
    },
    public status: BookingStatus
  ) {}
}

export type BookingStatus = 'awaiting'|'active'|'canceled'|'missing'|'complete';

export type CreateBookingDetails = {
  carId: string,
  totalHours: number,
  totalPrice: number,
  driver: boolean,
  bookedTimeSlots: {from: string, to: string},
}

export type GetBookingsSuccess = {
  message: string,
  totalBookings: number,
  numOfPages: number,
  currentPage: number,
  bookings: Booking[],
  success:  boolean
}
