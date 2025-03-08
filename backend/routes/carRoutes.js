import express from "express";
import axios from "axios";
import authMiddleware from "../middleware/authMiddleware.js"
const router = express.Router();
import { StatusCodes } from "http-status-codes";
import Car from "../models/carModel.js";

// Endpoint zwracający wszystkie pojazdy
router.get("/get-all-cars", async(req, res) => {

    // Na początku próbujemy zwrócić wszystkie samochody z naszej bazy danych
    try{
        const cars = await Car.find({});

        // W przypadku, gdy w bazie nie ma żadnego rekordu zwracamy informacje o braku zasobów
        if(!cars){
            return res.status(StatusCodes.NOT_FOUND)
            .json({ message: "Nie znaleziono zasobu", success: false });
        }

        // W przypadku znalezienia rekordów w bazie, wynik jest zwracany w odpowiedzi
        res.status(StatusCodes.OK)
        .json({ message: "Zwrócono listę samochodów",  data: cars, success: true});

    } // W przypadku błędu serwera, zwracany jest odpowiedni wyjątek
    catch(error){

        console.log(error);

        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Wewnętrzny błąd serwera", success: false, error });
    }

})

// Endpoint odpowiedzialny za utworzenie nowej oferty z samochodem
router.post("/create-car", authMiddleware, async(req, res) => {

    try{
        // Pobieramy wszystkie dane z ciała zapytania
        const { make, model, capacity, year, color, bodyType, gearboxType, mileage, fuelType, hourlyPrice, imageUrl, description } = req.body;

        // Sprawdzamy, czy którykolwiek z wymaganych pól jest pusty lub undefined
        if ([make, model, capacity, year, color, bodyType, gearboxType, mileage, fuelType, hourlyPrice, imageUrl, description].some(value => value === undefined || value === "")) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Nie wszystkie pola zostały uzupełnione przez użytkownika", success: false });
        }

        // Dodanie pola z informacją przez kogo została utworzona oferta oraz przez kogo została zmodyfikowana (utworzenie zasobu to też modyfikacja - jest to pierwsza modyfikacja)
        req.body.createdBy = req.user.userId;

        // Pole 'modifiedBy' składać się będzie z id modyfikacji, id użytkownika modyfikującego zasób i daty modyfikacji
        req.body.modifiedBy = { userId: req.user.userId, modifiedAt: new Date() }; 
        
        // Tworzymy nowy rekord (nową ofertę samochodu)
        const newCar = new Car(req.body)

        // Zapisanie rekordu w bazie
        await newCar.save();

        // W przypadku znalezienia utworzenia rekordu w bazie, wynik jest zwracany w odpowiedzi
        res.status(StatusCodes.OK)
        .json({ message: "Dodawanie nowej oferty zakończyło się powodzeniem", data: newCar, success: true});

    } // W przypadku błędu serwera, zwracany jest odpowiedni wyjątek
    catch(error){

        console.log(error);

        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Wewnętrzny błąd serwera", success: false, error });

    }

})

// Endpoint odpowiedzialny za modyfikację istniejącej już oferty z samochodem
router.patch("/update-car/:carId", authMiddleware, async(req, res) => {

    try{

        // Pobieramy wszystkie dane z ciała zapytania
        const { make, model, capacity, year, color, bodyType, gearboxType, mileage, fuelType, hourlyPrice, imageUrl, description } = req.body;

        // Sprawdzamy, czy którykolwiek z wymaganych pól jest pusty lub undefined
        if ([make, model, capacity, year, color, bodyType, gearboxType, mileage, fuelType, hourlyPrice, imageUrl, description].some(value => value === undefined || value === "")) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Nie wszystkie pola zostały uzupełnione przez użytkownika", success: false });
        }
        
        // Pobranie ID samochodu z parametru ścieżki
        const carId = req.params.carId; 

        console.log(carId);
        
        // Wyszukiwanie samochodu po numerze id
        const foundCar = await Car.findById(carId);

        // Jeśli samochód nie został znaleziony w bazie danych, to zwracany jest odpowiedni komunikat
        if(!foundCar){
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Nie znaleziono samochodu o takim numerze id", success: false });
        }

        




    }
    catch (error) {

        console.log(error);

        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Wewnętrzny błąd serwera", success: false, error });

    }

})

// Endpoint odpowiedzialny za przewidywanie należenia konkretnej obserwacji do danego klastra
router.post("/predict-cluster", authMiddleware, async(req, res) => {
    try{
        // Tworzymy URL, aby dostać się do ścieżki odpowiadającej za przewidywanie modelu
        const URL = process.env.FLASK_API_URL + "/predict";
                
        // Wysyłamy żądanie do serwera obsługującego model rekomendacji; wynik zapisujemy do zmiennej 'response'
        const response = await axios.post(URL, req.body);

        // W postaci pliku jsonowego przedstawiona zostanie odpowiedź serwera
        res.json(response.data);
    }
    // W przypadku błędu serwera, zwracany jest odpowiedni wyjątek
    catch(error){

        console.log(error);

        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Wewnętrzny błąd serwera", success: false, error });

    }

})

// Endpoint służący do pobrania kolekcji samochodów na podstawie preferencji użytkownika (na podstawie kolumny 'cluster')
router.get("/get-cars-by-cluster/:clusterId", authMiddleware, async(req, res) => {

    try{
         // Pobranie ID klastra do którego został przypisany samochód z parametru ścieżki
         const clusterId = req.params.clusterId;
         
         // Odpytujemy naszą bazę danych w poszukiwaniu po odpowiednim id klastra
         const cars = await Car.find({cluster: clusterId});

         // W przypadku, gdy w bazie nie ma żadnego rekordu zwracamy informacje o braku zasobów
        if(!cars){
            return res.status(StatusCodes.NOT_FOUND)
            .json({ message: "Nie znaleziono zasobu", success: false });
        }

        // W przypadku znalezienia rekordów w bazie, wynik jest zwracany w odpowiedzi
        res.status(StatusCodes.OK)
        .json({ message: "Zwrócono listę samochodów",  data: cars, success: true});

    } // W przypadku błędu serwera, zwracany jest odpowiedni wyjątek
    catch (error) {

        console.log(error);

        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Wewnętrzny błąd serwera", success: false, error });

    }

})

export default router;

