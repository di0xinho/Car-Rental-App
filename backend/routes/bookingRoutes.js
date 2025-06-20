import express, { Router } from "express";
import Stripe from "stripe";
import moment from "moment";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/BadRequest.js";
import NotFoundError from "../errors/NotFound.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import User from "../models/userModel.js";
import Car from "../models/carModel.js";
import Booking from "../models/bookingModel.js";
import authMiddleware from "../middleware/authMiddleware.js";
import checkPermissions from "../utils/checkPermissions.js";
import emailService from "../utils/emailService.js";
import dotenv from "dotenv";

const router = express.Router();

// Wczytujemy zmienne środowiskowe z pliku .env
dotenv.config();

// Wczytujemy ze zmiennych środowiskowych klucz prywatny do API platformy Stripe
const stripe_secret_key = process.env.STRIPE_SECRET_KEY;

const stripe = new Stripe(stripe_secret_key, {
  apiVersion: "2025-03-31.basil",
});

// Endpoint zwracający rezerwacje z filtrowaniem i paginacją
// Przykład: localhost:8000/api/bookings/get-all-bookings?user=123&car=456&isPaid=true&startDate=2025-01-01&endDate=2025-03-01&page=2
router.get(
  "/get-my-bookings",
  authMiddleware,
  asyncWrapper(async (req, res) => {
    const { carId, isPaid, startDate, endDate, page, limit, status } = req.query;

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

    if (status){
      queryObject.status = status // Filtrujemy po statusie zamówienia
    } 

    if (startDate || endDate) {
      const fromDate = startDate
        ? moment(startDate, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm")
        : "1970-01-01 00:00";

      const toDate = endDate
        ? moment(endDate, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm")
        : "3000-01-01 00:00";

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
      .populate({
        path: "user",
        select:
          "-password -resetPasswordCode -resetPasswordCodeExpiry -resetPasswordAttempts",
      })
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
  })
);

// Endpoint zwracający WSZYSTKIE rezerwacje z filtrowaniem i paginacją
router.get(
  "/get-all-bookings",
  authMiddleware,
  asyncWrapper(async (req, res) => {
    const { carId, isPaid, startDate, endDate, page, limit, status, userId } = req.query;

    // Sprawdzenie, czy uprawnienia użytkownika są wystarczające (czy jest adminem)
    checkPermissions(req.user);

    // Tworzymy dynamiczny obiekt zapytania
    const queryObject = {};

    // Możliwość przefiltrowania po ID użytkownika (opcjonalnie)
    if (userId) {
      queryObject.user = userId;
    }

    if (carId) {
      queryObject.car = carId;
    }

    if (isPaid !== undefined) {
      queryObject.isPaid = isPaid;
    }

    if (status) {
      queryObject.status = status;
    }

    if (startDate || endDate) {
      const fromDate = startDate
        ? moment(startDate, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm")
        : "1970-01-01 00:00";

      const toDate = endDate
        ? moment(endDate, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm")
        : "3000-01-01 00:00";

      queryObject["bookedTimeSlots.from"] = { $lte: toDate };
      queryObject["bookedTimeSlots.to"] = { $gte: fromDate };
    }

    // Budujemy zapytanie do bazy
    let result = Booking.find(queryObject);

    // Paginacja
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;
    result = result.skip(skip).limit(limitNum);

    // Pobranie danych + dołączenie info o użytkowniku i aucie
    const bookings = await result
      .populate({
        path: "user",
        select: "firstName surname phoneNumber",
      })
      .populate("car");

    // Liczenie wszystkich pasujących rekordów
    const totalBookings = await Booking.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalBookings / limitNum);

    // Odpowiedź
    res.status(StatusCodes.OK).json({
      message: "Wszystkie rezerwacje zostały zwrócone pomyślnie",
      totalBookings,
      numOfPages,
      currentPage: pageNum,
      bookings: bookings,
      success: true,
    });
  })
);

// Endpoint odpowiedzialny za rezerwację samochodu i rozpoczęcie procesu płatności
router.post(
  "/book-car",
  authMiddleware,
  asyncWrapper(async (req, res) => {
    const { booking_details, success_url, cancel_url } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) {
      throw new NotFoundError("Wybrany użytkownik nie figuruje w bazie danych");
    }

    const bookingCar = await Car.findById(booking_details.carId);
    if (!bookingCar) {
      throw new NotFoundError("Nie znaleziono samochodu o takim numerze id");
    }

    if (!bookingCar.isAvailable) {
      throw new BadRequestError(
        "Samochód jest tymczasowo niedostępny w ofercie wypożyczalni. Za utrudnienia przepraszamy."
      );
    }

    // Sprawdzanie kolizji rezerwacji z wykorzystaniem moment.js
    const requestedFrom = moment(booking_details.bookedTimeSlots.from, "YYYY-MM-DD HH:mm", true);
    const requestedTo = moment(booking_details.bookedTimeSlots.to, "YYYY-MM-DD HH:mm", true);

    // Walidacja poprawności dat
    if (!requestedFrom.isValid() || !requestedTo.isValid()) {
      throw new BadRequestError("Nieprawidłowy format daty. Użyj formatu 'YYYY-MM-DD HH:mm'.");
    }

    // Sprawdzenie czy data rozpoczęcia rezerwacji nie jest później od daty zakończenia rezerwacji
    if (requestedFrom.isSameOrAfter(requestedTo)) {
      throw new BadRequestError("Data rozpoczęcia musi być wcześniejsza niż data zakończenia.");
    }

    // Sprawdzenie, czy data rozpoczęcia nie jest wcześniejsza niż teraz
    if (requestedFrom.isBefore(moment())) {
      throw new BadRequestError("Nie można dokonać rezerwacji na przeszły termin.");
    }

    // Sprawdzenie kolizji z istniejącymi rezerwacjami
    const hasConflict = bookingCar.bookedTimeSlots.some(slot => {
    const existingFrom = moment(slot.from);
    const existingTo = moment(slot.to);

    return existingFrom.isBefore(requestedTo) && existingTo.isAfter(requestedFrom);
    });

    if (hasConflict) {
      throw new BadRequestError("Samochód jest już zarezerwowany w podanym przedziale czasu.");
    }

    // Wybór metody płatności
    switch (req.query.payment_type) {
      case "stripe":
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
          success_url: success_url,
          cancel_url: cancel_url,
          client_reference_id: req.user.userId,
          metadata: {
            carId: booking_details.carId,
            totalHours: booking_details.totalHours,
            from: booking_details.bookedTimeSlots.from,
            to: booking_details.bookedTimeSlots.to,
            driver: booking_details.driver,
          },
        });

        return res.status(StatusCodes.OK).json({
          message:
            "Tworzenie sesji rozliczeniowej zostało zrealizowane pomyślnie. Adres url sesji znajduje się w ciele odpowiedzi",
          url: session.url,
          success: true,
        });

      case "on-the-spot":
        bookingCar.bookedTimeSlots.push({
          from: requestedFrom.toDate(),
          to: requestedTo.toDate(),
        });
        await bookingCar.save();

        const newBooking = new Booking({
          user: user._id,
          car: bookingCar._id,
          totalHours: booking_details.totalHours,
          bookedTimeSlots: {
            from: requestedFrom.toDate(),
            to: requestedTo.toDate(),
          },
          driver: booking_details.driver,
          totalPrice: booking_details.totalPrice,
          isPaid: false,
          status: "awaiting"
        });

        await newBooking.save();

        try {
          const emailSent = await emailService.sendBookingDetails(
            user.email,
            booking_details,
            bookingCar
          );

          if (!emailSent) {
            console.warn(`Nie udało się wysłać emaila do ${user.email}`);
          }
        } catch (error) {
          console.error("Błąd podczas wysyłania emaila:", error);
        }

        // Dodanie id zamówienia do tablicy zamówień użytkownika
        user.bookings.push(newBooking._id);
        await user.save();

        return res.status(StatusCodes.OK).json({
          message: "Samochód został zarezerwowany. Opłatę uiścisz na miejscu.",
          url: success_url,
          success: true,
        });

      default:
        throw new BadRequestError("Wybierz poprawną formę płatności");
    }
  })
);

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
  })
);

// Endpoint zmieniający stan wybranej rezerwacji
router.patch("/update-booking-status/:bookingId",
  authMiddleware,
  asyncWrapper(async (req, res) => {
    // Sprawdzenie, czy uprawnienia użytkownika są wystarczające (czy jest adminem)
    checkPermissions(req.user);

    const bookingId = req.params.bookingId;
    const newStatus = req.body.status;

    // Szukamy rezerwacji z podanym ID
    const booking = await Booking.findById(bookingId).populate("car");
    if (!booking) {
      throw new NotFoundError("Nie znaleziono rezerwacji o takim numerze id");
    }

    // Zmieniamy status rezerwacji
    booking.status = newStatus;

    // Jeśli rezerwacja została anulowana lub nie doszła do skutku — usuwamy jej daty z samochodu
    if (newStatus === 'canceled' || newStatus === 'missing') {
      const foundCar = await Car.findById(booking.car._id);
      if (!foundCar) {
        throw new NotFoundError("Nie znaleziono samochodu o takim numerze id");
      }

      // Usunięcie slotu czasowego z bookedTimeSlots
      // Zamiana dat na obiekty Date za pomocą moment (zachowanie kompatybilności z MongoDB)
      const fromDate = moment(booking.bookedTimeSlots.from).toDate();
      const toDate = moment(booking.bookedTimeSlots.to).toDate();

      foundCar.bookedTimeSlots = foundCar.bookedTimeSlots.filter(slot => {
        // Porównanie dat przy użyciu getTime()
        return !(
          moment(slot.from).toDate().getTime() === fromDate.getTime() &&
          moment(slot.to).toDate().getTime() === toDate.getTime()
        );
      });

      await foundCar.save();
    }

    await booking.save();

    res.status(StatusCodes.OK).json({
      message: "Wybrana rezerwacja została zmodyfikowana pomyślnie",
      data: booking,
      success: true,
    });
  })
);

// Endpoint rozpoczynający wypożyczenie
router.patch("/start-a-rental/:bookingId",
  authMiddleware,
  asyncWrapper(async (req, res) => {

    // Sprawdzenie, czy uprawnienia użytkownika są wystarczające (czy jest adminem)
    checkPermissions(req.user);

    // Pobranie ID wypożyczenia z parametru ścieżki
    const bookingId = req.params.bookingId;

    // Szukamy wypożyczenia o podanym w parametrze id dołączając do rezultatu auto, na które została przeprowadzona rezerwacja
    const booking = await Booking.findById(bookingId).populate("car");

    // Jeśli takowego nie ma, to zwracamy odpowiedni komunikat
    if (!booking) {
      throw new NotFoundError("Nie znaleziono rezerwacji o takim numerze id");
    }

    // Pobranie daty rozpoczęcia wypożyczenia z ciała żądania
    const from = req.body.from;

    // Walidacja daty i konwersja przez moment
    const rentFromMoment = moment(from, "YYYY-MM-DD HH:mm", true);

    if (!from || !rentFromMoment.isValid()) {
      throw new BadRequestError("Nieprawidłowy format daty rozpoczęcia");
    }

    // W przypadku, gdy status rezerwacji jest inny niż 'awaiting', wtedy zwracamy odpowiedni wyjątek
    if (booking.status !== "awaiting") {
      throw new BadRequestError("Tylko rezerwacja o statusie 'awaiting' może zostać aktywowana");
    }

    // Aktualizacja danych o wypożyczeniu
    booking.status = "active"; // Zmiana statusu wypożyczenia na aktywny
    booking.rent.from = rentFromMoment.toDate(); // Data faktycznego wypożyczenia (Date)
    booking.rent.carMileageAtStart = booking.car.mileage; // Obecny stan przebiegu

    // Opcjonalna aktualizacja statusu płatności
    const isPaid = req.body.isPaid;

    if (isPaid !== undefined) {
      if (typeof isPaid !== "boolean") {
        throw new BadRequestError("Pole 'isPaid' musi być wartością typu boolean");
      }
      booking.isPaid = isPaid;
    }

    // Zapisujemy zmieniony rekord
    await booking.save();

    // Zwracamy odpowiednią odpowiedź
    res.status(StatusCodes.OK).json({
      message: "Wybrana rezerwacja została zmodyfikowana pomyślnie - wynajem został rozpoczęty",
      data: booking,
      success: true,
    });
  })
);

// Endpoint kończący wypożyczenie
router.patch("/end-the-rental/:bookingId",
  authMiddleware,
  asyncWrapper(async (req, res) => {

    // Sprawdzenie, czy uprawnienia użytkownika są wystarczające (czy jest adminem)
    checkPermissions(req.user);

    // Pobranie ID wypożyczenia z parametru ścieżki
    const bookingId = req.params.bookingId;

    // Szukamy wypożyczenia o podanym w parametrze id dołączając do rezultatu auto, na które została przeprowadzona rezerwacja
    const booking = await Booking.findById(bookingId).populate("car");

    // Jeśli takowego nie ma, to zwracamy odpowiedni komunikat
    if (!booking) {
      throw new NotFoundError("Nie znaleziono rezerwacji o takim numerze id");
    }

    // Pobranie daty zakończenia wypożyczenia oraz przebiegu z ciała żądania
    const { to, carMileageAtEnd } = req.body;

    // Walidacja daty przez moment
    const rentToMoment = moment(to, "YYYY-MM-DD HH:mm", true);
    if (!to || !rentToMoment.isValid()) {
      throw new BadRequestError("Nieprawidłowy format daty zakończenia");
    }

    // Sprawdzamy, czy przebieg jest liczbą oraz czy nie jest on mniejszy niż przebieg początkowy
    if (typeof carMileageAtEnd !== "number" || carMileageAtEnd < booking.rent.carMileageAtStart) {
      throw new BadRequestError("Przebieg końcowy musi być liczbą i nie może być mniejszy niż początkowy");
    }

    // Aktualizacja danych o wypożyczeniu
    booking.status = "complete"; // Zmiana statusu wypożyczenia na zakończone
    booking.rent.to = rentToMoment.toDate(); // Data faktycznego zakończenia wypożyczenia (Date)
    booking.rent.carMileageAtEnd = carMileageAtEnd; // Stan przebiegu po wypożyczeniu

    // Wyszukiwanie samochodu po numerze id, w celu zaktualizowania jego przebiegu
    const foundCar = await Car.findById(booking.car._id);

    // Jeśli takowego samochodu nie ma w bazie danych, to zwracamy odpowiedni wyjątek
    if (!foundCar) {
      throw new NotFoundError("Nie znaleziono samochodu o takim numerze id");
    }

    // Nadpisanie przebiegu
    foundCar.mileage = carMileageAtEnd;

    // Zapisujemy zmiany zmodyfikowanych zasobów
    await booking.save();
    await foundCar.save();

    // Zwracamy odpowiednią odpowiedź
    res.status(StatusCodes.OK).json({
      message: "Wybrana rezerwacja została zmodyfikowana pomyślnie - wynajem został zakończony",
      data: booking,
      success: true,
    });
  })
);

// Endpoint odpowiedzialny za usunięcie wybranego wypożyczenia z bazy danych
router.delete("/delete-booking/:bookingId", authMiddleware, asyncWrapper(async (req, res) => {

  // Sprawdzenie, czy uprawnienia użytkownika są wystarczające (czy jest adminem)
  checkPermissions(req.user);

  // Pobranie ID wypożyczenia z parametru ścieżki
  const bookingId = req.params.bookingId;

  // Wyszukiwanie wypożyczenia po numerze id
  const deletedBooking = await Booking.findOneAndDelete({ _id: bookingId });

  // Jeśli wypożyczenie nie zostało znalezione w bazie danych, to zwracany jest odpowiedni komunikat
  if (!deletedBooking) {
    throw new NotFoundError("Nie znaleziono wypożyczenia o takim numerze id");
  }

  // W przypadku pomyślnego usunięcia zasobu z bazy danych, wyświetlamy następujący komunikat
  res.status(StatusCodes.OK).json({
    message: "Wybrany zasób został usunięty z bazy danych",
    data: deletedBooking,
    success: true,
  });
}));

export default router;
