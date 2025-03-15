// Importujemy potrzebne moduły do pliku 
import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import connection from "./db/connection.js";
import User from "../backend/models/userModel.js";
import Car from "../backend/models/carModel.js";
import Booking from "../backend/models/bookingModel.js";

// Wczytujemy zmienne środowiskowe z pliku .env
dotenv.config();

// Wczytujemy ze zmiennych środowiskowych klucz prywatny do API platformy Stripe 
const stripe_secret_key = process.env.STRIPE_SECRET_KEY;

const stripe = new Stripe(stripe_secret_key);

// Klucz prywatny do testowania webhooka Stripe CLI na środowisku lokalnym
const stripe_endpoint_secret = process.env.STRIPE_ENDPOINT_SECRET;

const app = express();

// Definiujemy port, na którym nasłuchuje serwer 
const port = 4242;

app.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    async (request, response) => {
      const sig = request.headers["stripe-signature"];
  
      let event;
  
      try {
        event = stripe.webhooks.constructEvent(request.body, sig, stripe_endpoint_secret);
      } catch (err) {
        response
          .status(StatusCodes.BAD_REQUEST)
          .send(`Webhook Error: ${err.message}`);
        return;
      }

      // Handle the event
      switch (event.type) {
        case "payment_intent.succeeded":
          const session = event.data.object;
          const session_2 = event.data;
          

          console.log(session_2)
  
          // Znajdź użytkownika i samochód na podstawie danych w sesji
          const user = await User.findById(session.client_reference_id);
          const bookingCar = await Car.findById(session.metadata.carId);
  
          if (user && bookingCar) {
            // Aktualizacja danych samochodu
            bookingCar.bookedTimeSlots.push({
              from: session.metadata.from,
              to: session.metadata.to,
            });
            bookingCar.isAvailable = false;
            await bookingCar.save();
  
            // Utwórz nową rezerwację
            const newBooking = new Booking({
              user: user._id,
              car: bookingCar._id,
              bookedTimeSlots: {
                from: session.metadata.from,
                to: session.metadata.to,
              },
              totalPrice: session.amount_total / 100,
              isPaid: true,
            });
  
            await newBooking.save();
          }
  
          // Then define and call a function to handle the event invoice.payment_succeeded
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
  
      // Return a 200 response to acknowledge receipt of the event
      response.send();
    }
  );

  // Funkcja asynchroniczna startująca serwer
const start = async() => {

    try{
        // Nawiązujemy połączenie z bazą danych MongoDB, używając adresu URL i nazwy bazy z pliku ze zmiennymi środowiskowymi
        await connection(process.env.MONGO_URL, process.env.DATABASE_NAME);

        // Uruchamiamy serwer i ustawiamy go na nasłuchiwanie na określonym porcie
        // Po uruchomieniu w konsoli pojawi się komunikat informujący, na jakim porcie działa serwer
        app.listen(port, () => {
            console.log(`Serwer działa na porcie ${port}`);
        });

    }catch(error){
        // W przypadku błędu podczas połączenia z bazą danych wyświetlamy komunikat w konsoli
        console.log(error);
    }
}

// Uruchamiamy aplikację
start();

  