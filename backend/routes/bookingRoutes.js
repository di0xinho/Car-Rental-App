import express, { Router } from "express";
import Stripe from "stripe";
import moment from 'moment';
const router = express.Router();
import { StatusCodes } from "http-status-codes";
import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError, TooManyRequestsError } from "../errors/index.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import User from "../models/userModel.js";
import Car from "../models/carModel.js";
import Booking from "../models/bookingModel.js";
import authMiddleware from "../middleware/authMiddleware.js";
import emailService from "../utils/emailService.js";
import dotenv from "dotenv";

// Wczytujemy zmienne środowiskowe z pliku .env
dotenv.config();

// Wczytujemy ze zmiennych środowiskowych klucz prywatny do API platformy Stripe
const stripe_secret_key = process.env.STRIPE_SECRET_KEY;

const stripe = new Stripe(stripe_secret_key, {
   apiVersion: '2025-03-31.basil',  
  });

// Endpoint zwracający rezerwacje z filtrowaniem i paginacją
// Przykład: localhost:8000/api/bookings/get-all-bookings?user=123&car=456&isPaid=true&startDate=2025-01-01&endDate=2025-03-01&page=2
router.get("/get-all-bookings", authMiddleware, asyncWrapper(async (req, res) => {

  const { carId, isPaid, startDate, endDate, page, limit } = req.query;

  // Pobieramy id użytkownika
  const userId = req.user.userId;
  
  // Tworzymy obiekt zapytania dynamicznie na podstawie parametrów
  const queryObject = {};

  // Filtrujemy po id użytkownika
  queryObject.user = userId;

  if (carId) {
    queryObject.car = carId; // Filtrujemy po id samochodu
  }
  if (isPaid !== undefined) {
    queryObject.isPaid = isPaid; // Filtrujemy po statusie opłaty
  }

  if (startDate || endDate) {
    const fromDate = startDate
      ? moment(startDate, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm')
      : '1970-01-01 00:00';
  
    const toDate = endDate
      ? moment(endDate, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm')
      : '3000-01-01 00:00';

    queryObject["bookedTimeSlots.from"] = { $lte: toDate };
    queryObject["bookedTimeSlots.to"] = { $gte: fromDate };
  }
  
   // Znalezienie pasujących rezerwacji według wprowadzonych parametrów
  let result = Booking.find(queryObject);

  // Obsługa paginacji
  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;
  const skip = (pageNum - 1) * limitNum;
  result = result.skip(skip).limit(limitNum);

  // Pobranie wyników
  const bookings = await result
  .populate({ path: "user", select: "-password -resetPasswordCode -resetPasswordCodeExpiry -resetPasswordAttempts"})
  .populate("car"); // Do wyniku dołączamy samochód i użytkownika, na którego została przeprowadzona rezerwacja

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

}));

// Endpoint odpowiedzialny za rezerwację samochodu i rozpoczęcie procesu płatności
router.post("/book-car", authMiddleware, asyncWrapper(async (req, res) => {
  const { booking_details } = req.body;

  // Znajdujemy użytkownika po ID
  const user = await User.findById(req.user.userId);
  if (!user) {
    throw new NotFoundError("Wybrany użytkownik nie figuruje w bazie danych");
  }

  // Znajdujemy samochód po ID
  const bookingCar = await Car.findById(booking_details.carId);

  // Sprawdzamy, czy samochód znajduje się w bazie wypożyczalni
  if (!bookingCar) {
    throw new NotFoundError("Nie znaleziono samochodu o takim numerze id");
  }

  // Sprawdzamy, czy samochód jest dostępny do wypożyczenia
  if (!bookingCar.isAvailable) {
    throw new BadRequestError("Samochód jest tymczasowo niedostępny w ofercie wypożyczalni. Za utrudnienia przepraszamy.");
  }

  // Tworzenie sesji Stripe
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    ui_mode: "custom",
    line_items: [
      {
        price_data: {
          currency: "pln",
          product_data: {
            name: `Wypożyczenie samochodu ${bookingCar.make} ${bookingCar.model} na okres od ${booking_details.bookedTimeSlots.from} do ${booking_details.bookedTimeSlots.to}`,
          },
          unit_amount: booking_details.totalPrice * 100,
        },
        quantity: 1,
      },
    ],
    client_reference_id: req.user.userId,
    metadata: {
      carId: booking_details.carId,
      totalHours: booking_details.totalHours,
      from: booking_details.bookedTimeSlots.from,
      to: booking_details.bookedTimeSlots.to,
      driver: booking_details.driver
    },
  });

  // Zwrócenie odpowiedzi z url sesji rozliczeniowej
  res.status(StatusCodes.OK).json({
    message:
      "Tworzenie sesji rozliczeniowej zostało zrealizowane pomyślnie. Adres url sesji znajduje się w ciele odpowiedzi",
    url: session.url,
    success: true,
  });
}));

// Endpoint zwracający szczegóły dotyczące rezerwacji
router.get(
  "/get-booking-details/:bookingId",
  authMiddleware,
  asyncWrapper(async (req, res) => {
    // Pobranie ID wypożyczenia z parametru ścieżki
    const bookingId = req.params.bookingId;

    // Szukamy wypożyczenia o podanym w parametrze id dołączając do rezultatu auto, na które została przeprowadzona rezerwacja
    const booking = await Booking.findById(bookingId).populate("car");

    // Jeśli w bazie danych nie ma rezerwacji o podanym numerze id, to zwracany jest odpowiedni komunikat
    if (!booking) {
      throw new NotFoundError("Nie znaleziono rezerwacji o takim numerze id");
    }

    // W przypadku pomyślnego znalezienia zasobu w bazie danych, wyświetlamy następujący komunikat
    res.status(StatusCodes.OK).json({
      message:
        "Szczegóły dotyczące rezerwacji wybranego samochodu zostały zwrócone pomyślnie",
      data: booking,
      success: true,
    });
  }
));

export default router;
