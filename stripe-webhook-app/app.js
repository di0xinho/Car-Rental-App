// Importujemy potrzebne moduły do pliku 
import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
import connection from "./db_connection/connection.js";
import User from "./models/userModel.js";
import Car from "./models/carModel.js";
import Booking from "./models/bookingModel.js";

// Wczytujemy zmienne środowiskowe z pliku .env
dotenv.config();

// Wczytujemy ze zmiennych środowiskowych klucz prywatny do API platformy Stripe 
const stripe_secret_key = process.env.STRIPE_SECRET_KEY;

const stripe = new Stripe(stripe_secret_key);

// Klucz prywatny do testowania webhooka Stripe CLI na środowisku lokalnym
const stripe_endpoint_secret = process.env.STRIPE_ENDPOINT_SECRET;

// Definiujemy port, na którym nasłuchuje serwer 
const port = 4242;

const app = express();

app.get("/", (req, res) => {
    return res
      .status(StatusCodes.OK)
      .json({
        message:
          "Aplikacja działa poprawnie",
        success: true,
      });
})

app.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    async (request, response) => {

    
      const sig = request.headers["stripe-signature"];


      console.log(sig);
  
      let event;
  
      try {
        event = stripe.webhooks.constructEvent(request.body, sig, stripe_endpoint_secret);
      } catch (err) {
        response
          .status(StatusCodes.BAD_REQUEST)
          .send(`Webhook Error: ${err.message}`);
        return;
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
            bookingCar.isAvailable = false;
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
            });
            
            // Zapisujemy rekord w bazie danych
            await newBooking.save();
          }
  
          // Poniżej możemy obsłużyć inne typy zdarzeń...
          break;
        default:
          console.log(`Nieobsłużony typ zdarzenia ${event.type}`);
      }
  
      // W przypadku powodzenia zwracamy status code równy 200 - czyli OK
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

  