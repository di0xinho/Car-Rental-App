// Importujemy moduł Express.js 
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

// Tworzymy instancję aplikacji Express
const app = express();

// Dodajemy obsługę ciasteczek
app.use(cookieParser());

// Importujemy moduł "dotenv" do obsługi zmiennych środowiskowych 
import dotenv from 'dotenv';

// Importujemy routery dla endpointów związanych z samochodami, procesami związanymi z autentykacją użytkownika oraz z wypożyczeniami samochodów
import carRoutes from "./routes/carRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import stripeWebhook from "./routes/stripeWebhook.js";

// Wczytujemy zmienne środowiskowe z pliku .env
dotenv.config();

app.use("/api", stripeWebhook); // dla webhooków Stripe

// Importujemy moduł do połączenia z bazą danych MongoDB
import connection from "./db/connection.js";

// Korzystamy z morgana tylko w środowisku deweloperskim, a nie na produkcji
if (process.env.NODE_ENV !== "Production") {
    app.use(morgan('dev'));
}
  
// Middleware do parsowania JSON-ów w przychodzących żądaniach HTTP
app.use(express.json());

// Aplikacja korzystać będzie z paczek zabezpieczających przed atakami xss oraz NoSQL injection
app.use(xss());
app.use(mongoSanitize());

// Zezwalamy na żądania z przeglądarek za pomocą mechanizmu CORS
app.use(
    cors({
      origin: ["http://localhost:5173", "https://yellow-ground-02ec85703.6.azurestaticapps.net"], // lista dozwolonych domen, które mogą wysyłać żądania do serwera
      credentials: true,
    })
  );

// Importujemy middleware do obsługi błędów serwera
import errorMiddleware from "./middleware/errorMiddleware.js";

// Rejestrujemy ścieżkę API dla operacji na samochodach  
app.use("/api/cars", carRoutes);

// Robimy to samo dla innych ścieżek API...
app.use("/api/auth", authRoutes); // do autentykacji użytkownika
app.use("/api/booking", bookingRoutes) // do wypożyczeń samochodów
app.use("/api/admin", adminRoutes); // dla administratora

// Używamy middleware do obsługi błędów jako ostatniego
app.use(errorMiddleware);

// Definiujemy port, na którym nasłuchuje serwer (domyślnie jest to port 8000); w przeciwnym wypadku będzie to port 5000
const port = process.env.PORT || 5000;

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


