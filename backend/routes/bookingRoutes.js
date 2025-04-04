import express, { Router } from "express";
import Stripe from "stripe";
const router = express.Router();
import { v4 as uuidv4 } from "uuid";
import { StatusCodes } from "http-status-codes";
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

const stripe = new Stripe(stripe_secret_key);

// Endpoint zwracający rezerwacje z filtrowaniem i paginacją
// Przykład: localhost:8000/api/bookings/get-all-bookings?user=123&car=456&isPaid=true&startDate=2025-01-01&endDate=2025-03-01&page=2
router.get("/get-all-bookings", authMiddleware, async (req, res) => {
  const { user, car, isPaid, startDate, endDate, page, limit } = req.query;

  // Tworzymy obiekt zapytania dynamicznie na podstawie parametrów
  const queryObject = {};

  if (user) {
    queryObject.user = user; // Filtrujemy po ID użytkownika
  }
  if (car) {
    queryObject.car = car; // Filtrujemy po ID samochodu
  }
  if (isPaid !== undefined) {
    queryObject.isPaid = isPaid === "true"; // Filtrujemy po statusie opłaty
  }
  if (startDate || endDate) {
    queryObject["bookedTimeSlots.from"] = {};
    queryObject["bookedTimeSlots.to"] = {};
    if (startDate)
      queryObject["bookedTimeSlots.from"].$gte = new Date(startDate);
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
  const bookings = await result.populate("car user"); // Do wyniku dołączamy samochód i użytkownika, na którego została przeprowadzona rezerwacja

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

// Endpoint odpowiedzialny za rezerwację samochodu i rozpoczęcie procesu płatności
router.post("/book-car", authMiddleware, async (req, res) => {
  const { booking_details } = req.body;

  // Znajdujemy użytkownika po ID
  const user = await User.findById(req.user.userId);
  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: "Wybrany użytkownik nie figuruje w bazie danych",
      success: false,
    });
  }

  // Znajdujemy samochód po ID
  const bookingCar = await Car.findById(booking_details.carId);

  // Sprawdzamy, czy samochód znajduje się w bazie wypożyczalni
  if (!bookingCar) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Nie znaleziono samochodu o takim numerze id",
      success: false,
    });
  }

  // Sprawdzamy, czy samochód jest dostępny do wypożyczenia
  if (!bookingCar.isAvailable) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Samochód jest tymczasowo niedostępny w ofercie wypożyczalni. Za utrudnienia przepraszamy.",
      success: false,
    });
  }

  // Tworzenie sesji Stripe
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
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
    success_url: `https://www.onet.pl/`, // Przekierowanie na onet.pl w przypadku powodzenia :)
    cancel_url: `https://www.sejm.gov.pl/`, // Przekierowanie na stronę sejmu w razie błędu :)
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
});

// Endpoint zwracający szczegóły dotyczące rezerwacji
router.get(
  "/get-booking-details/:bookingId",
  authMiddleware,
  async (req, res) => {
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
      message:
        "Szczegóły dotyczące rezerwacji wybranego samochodu zostały zwrócone pomyślnie",
      data: booking,
      success: true,
    });
  }
);

export default router;
