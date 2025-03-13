import express, { Router } from "express";
const router = express.Router();
import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import Booking from "../models/bookingModel.js";
import authMiddleware from "../middleware/authMiddleware.js";
import emailService from "../utils/emailService.js";

// Endpoint zwracający szczegóły dotyczące rezerwacji
router.get("/get-booking-details/:bookingId", authMiddleware, async(req, res) => {
    // Pobranie ID wypożyczenia z parametru ścieżki
    const bookingId = req.params.bookingId;

    // Szukamy wypożyczenia o podanym w parametrze id dołączając do rezultatu auto, na które została przeprowadzona rezerwacja
    const booking = await Booking.findById(bookingId).populate("car");

    // Jeśli w bazie danych nie ma rezerwacji o podanym numerze id, to zwracany jest odpowiedni komunikat
    if (!booking) {
        return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Nie znaleziono rezerwacji o takim numerze id",
        success: false,
        });
    }

    // W przypadku pomyślnego znalezienia zasobu w bazie danych, wyświetlamy następujący komunikat
    res.status(StatusCodes.OK).json({
        message: "Szczegóły dotyczące rezerwacji wybranego samochodu zostały zwrócone pomyślnie",
        data: booking,
        success: true,
    });
})



export default router;