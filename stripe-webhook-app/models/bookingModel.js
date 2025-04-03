import mongoose from 'mongoose'

// Pola: car, user, bookedTimeSlots, totalHours, totalPrice, transactionId, driver, isPaid

// Definiujemy schemat dla modelu Booking
const bookingSchema = new mongoose.Schema(
  {
    car: { type: mongoose.Schema.Types.ObjectID, ref: "cars" }, // Referencja do wynajmowanego auta
    user: { type: mongoose.Schema.Types.ObjectID, ref: "users" }, // Referencja do użytkownika, który wynajął auto
    // Data wynajmu pojazu
    bookedTimeSlots: {
      from: { type: String }, // Wynajem od
      to: { type: String }, // Wynajem do
    },
    totalHours: { type: Number }, // Liczba godzin wynajmu
    totalPrice: { type: Number }, // Kwota do zapłaty
    transactionId: { type: String }, // Numer transakcji
    driver: { type: Boolean }, // Czy wynajem obejmuje ofertę z kierowcą
    isPaid: { type: Boolean }, // Czy wynajem został już opłacony
  },

   // Ustawiamy timestamps na 'true', by móc podejrzeć datę utworzenia i modyfikacji dokumentu
  {
    timestamps: true,
  }
);

// Utworzenie modelu Booking na podstawie schematu i jego eksportacja, aby mógł być używany w innych częściach aplikacji
export default mongoose.model("bookings", bookingSchema)