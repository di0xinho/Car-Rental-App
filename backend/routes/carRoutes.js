import express from "express";
const router = express.Router();
import { StatusCodes } from "http-status-codes";
import Car from "../models/carModel.js";

// Prosty endpoint sprawdzający czy wszystko działa
router.get("/", (req, res) => {
    res.status(StatusCodes.OK)
    .send("Hello world!");
});

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

export default router;

