import express from "express";
import BadRequestError from "../errors/BadRequest.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import emailService from "../utils/emailService.js";
import Stripe from "stripe";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import Car from "../models/carModel.js";
import Booking from "../models/bookingModel.js";
import moment from "moment";

const router = express.Router();
dotenv.config();

const stripe_secret_key = process.env.STRIPE_SECRET_KEY;
const stripe_endpoint_secret = process.env.STRIPE_ENDPOINT_SECRET;
const stripe = new Stripe(stripe_secret_key);

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

    // Obsługa zdarzeń Stripe
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        const user = await User.findById(session.client_reference_id);
        const bookingCar = await Car.findById(session.metadata.carId);

        if (user && bookingCar) {
          bookingCar.bookedTimeSlots.push({
            from: moment(session.metadata.from, "YYYY-MM-DD HH:mm", true),
            to: moment(session.metadata.to, "YYYY-MM-DD HH:mm", true),
          });
          await bookingCar.save();

          const newBooking = new Booking({
            user: user._id,
            car: bookingCar._id,
            totalHours: session.metadata.totalHours,
            bookedTimeSlots: {
              from: moment(session.metadata.from, "YYYY-MM-DD HH:mm", true),
              to: moment(session.metadata.to, "YYYY-MM-DD HH:mm", true),
            },
            driver: session.metadata.driver,
            totalPrice: session.amount_total / 100,
            isPaid: true,
            status: "awaiting",
          });

          await newBooking.save();

          user.bookings.push(newBooking._id);
          await user.save();

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

        break;
      }

      default:
        console.log(`Nieobsłużony typ zdarzenia ${event.type}`);
    }

    response.send();
  })
);

export default router;
