import express, { Router } from "express";
const router = express.Router();
import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import Booking from "../models/bookingModel.js";
import authMiddleware from "../middleware/authMiddleware.js";
import emailService from "../utils/emailService.js";

// Endpoint zwracający rezerwacje z filtrowaniem i paginacją
// Przykład: localhost:8000/api/bookings/get-all-bookings?user=123&car=456&isPaid=true&startDate=2025-01-01&endDate=2025-03-01&page=2
router.get("/get-all-bookings", async (req, res) => {
    const {
      user,
      car,
      isPaid,
      startDate,
      endDate,
      page,
      limit,
    } = req.query;
  
    // Tworzymy obiekt zapytania dynamicznie na podstawie parametrów
    const queryObject = {};
  
    if (user) {
      queryObject.user = user; // Filtrujemy po ID użytkownika
    }
    if (car) {
      queryObject.car = car; // Filtrujemy po ID samochodu
    }
    if (isPaid !== undefined) {
      queryObject.isPaid = isPaid === 'true'; // Filtrujemy po statusie opłaty
    }
    if (startDate || endDate) {
      queryObject["bookedTimeSlots.from"] = {};
      queryObject["bookedTimeSlots.to"] = {};
      if (startDate) queryObject["bookedTimeSlots.from"].$gte = new Date(startDate);
      if (endDate) queryObject["bookedTimeSlots.to"].$lte = new Date(endDate);
    }
  
    // Znalezienie pasujących rezerwacji według wprowadzonych parametrów
    let result = Booking.find(queryObject);
  
    // Obsługa paginacji
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;
    result = result.skip(skip).limit(limitNum);
  
    // Pobranie wyników
    const bookings = await result.populate('car user'); // Do wyniku dołączamy samochód i użytkownika, na którego została przeprowadzona rezerwacja
    
    // Liczba dostępnych rezerwacji po przefiltrowaniu
    const totalBookings = await Booking.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalBookings / limitNum);
  
    // Zwrócenie odpowiedzi
    res.status(StatusCodes.OK).json({
      message: "Lista rezerwacji została zwrócona",
      totalBookings,
      numOfPages,
      currentPage: pageNum,
      bookings: bookings,
      success: true,
    });
  });
  
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