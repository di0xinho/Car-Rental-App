// Importujemy moduł Express.js 
import express from "express";

// Tworzymy instancję aplikacji Express
const app = express();

// Importujemy moduł "dotenv" do obsługi zmiennych środowiskowych 
import dotenv from 'dotenv';

// Wczytujemy zmienne środowiskowe z pliku .env
dotenv.config();

// Importujemy moduł do połączenia z bazą danych MongoDB
import connection from "./db/connection.js";

// Middleware do parsowania JSON-ów w przychodzących żądaniach HTTP
app.use(express.json());

// Importujemy router dla endpointów związanych z samochodami
import carRoutes from "./routes/carRoutes.js";

// Rejestrujemy ścieżkę API dla operacji na samochodach 
app.use("/api/cars", carRoutes);

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


