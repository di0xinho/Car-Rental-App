import express from "express";
import BadRequestError from "../errors/BadRequest.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import emailService from "../utils/emailService.js";
import Stripe from "stripe";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import Car from "../models/carModel.js";
import Booking from "../models/bookingModel.js";

const router = express.Router();

// Wczytujemy zmienne środowiskowe z pliku .env
dotenv.config();

// Wczytujemy ze zmiennych środowiskowych klucz prywatny do API platformy Stripe
const stripe_secret_key = process.env.STRIPE_SECRET_KEY;

const stripe = new Stripe(stripe_secret_key);

// Klucz prywatny do testowania webhooka Stripe CLI na środowisku lokalnym
const stripe_endpoint_secret = process.env.STRIPE_ENDPOINT_SECRET;

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  asyncWrapper(async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        sig,
        stripe_endpoint_secret
      );
    } catch (err) {
      throw new BadRequestError(`Webhook Error: ${err.message}`);
    }

    // Obsługa zdarzeń
    switch (event.type) {
      // Przypadek, w którym sesja rozliczeniowa zakończyła się powodzeniem (udało się opłacić usługę)
      case "checkout.session.completed":
        const session = event.data.object;

        // Znajdź użytkownika i samochód na podstawie danych w sesji
        const user = await User.findById(session.client_reference_id);
        const bookingCar = await Car.findById(session.metadata.carId);

        if (user && bookingCar) {
          // Aktualizacja danych samochodu (data użytkowania samochodu przez innego użytkownika, dostępność samochodu)
          bookingCar.bookedTimeSlots.push({
            from: session.metadata.from,
            to: session.metadata.to,
          });
          
          await bookingCar.save();

          // Tworzymy nową rezerwację i uzupełniamy ją o wartości pól, które zdefiniowane zostały w schemacie Mongoose
          const newBooking = new Booking({
            user: user._id,
            car: bookingCar._id,
            totalHours: session.metadata.totalHours,
            bookedTimeSlots: {
              from: session.metadata.from,
              to: session.metadata.to,
            },
            driver: session.metadata.driver,
            totalPrice: session.amount_total / 100,
            isPaid: true,
            status: "awaiting"
          });

          // Zapisujemy rekord w bazie danych
          await newBooking.save();

          // Wysyłanie emaila przez Azure
          try {
            const emailSent = await emailService.sendBookingDetails(
              user.email,
              newBooking,
              bookingCar
            );

            if (!emailSent) {
              console.warn(`Nie udało się wysłać emaila do ${user.email}`);
            }
          } catch (error) {
            console.error("Błąd podczas wysyłania emaila:", error);
          }
        }

        // Poniżej możemy obsłużyć inne typy zdarzeń...
        break;
      default:
        console.log(`Nieobsłużony typ zdarzenia ${event.type}`);
    }

    // W przypadku powodzenia zwracamy status code równy 200 - czyli OK
    response.send();
  })
);

export default router;
