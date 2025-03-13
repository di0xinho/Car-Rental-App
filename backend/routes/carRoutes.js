import express from "express";
import axios from "axios";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();
import { StatusCodes } from "http-status-codes";
import Car from "../models/carModel.js";
import User from "../models/userModel.js";
import validateField from "../utils/validateField.js";
import {
  makeSchema,
  modelSchema,
  capacitySchema,
  yearSchema,
  colorSchema,
  bodyTypeSchema,
  gearboxTypeSchema,
  mileageSchema,
  fuelTypeSchema,
  hourlyPriceSchema,
  imageUrlSchema,
  descriptionSchema,
} from "../utils/carFieldSchemas.js";

// Endpoint zwracający wszystkie pojazdy
router.get("/get-all-cars", async (req, res) => {
  // Na początku próbujemy zwrócić wszystkie samochody z naszej bazy danych

  const cars = await Car.find({});

  // W przypadku, gdy w bazie nie ma żadnego rekordu zwracamy informacje o braku zasobów
  if (!cars) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Nie znaleziono zasobu", success: false });
  }

  // W przypadku znalezienia rekordów w bazie, wynik jest zwracany w odpowiedzi
  res
    .status(StatusCodes.OK)
    .json({ message: "Zwrócono listę samochodów", data: cars, success: true });
});

// Endpoint odpowiadający za zwrócenie informacji o danym samochodzie wykorzystując jego id
router.get("/get-car-by-id/:carId", async (req, res) => {
  // Pobranie ID samochodu z parametru ścieżki
  const carId = req.params.carId;

  // Wyszukiwanie samochodu po numerze id
  const foundCar = await Car.findById(carId);

  // Jeśli samochód nie został znaleziony w bazie danych, to zwracany jest odpowiedni komunikat
  if (!foundCar) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Nie znaleziono samochodu o takim numerze id",
      success: false,
    });
  }

  // W przypadku znalezienia samochodu o danym adresie id, serwer zwraca odpowiednią odpowiedź
  res
    .status(StatusCodes.OK)
    .json({
      message: `Zwrócono informacje dotyczące pojazdu o numerze id: ${carId}`,
      data: foundCar,
      success: true,
    });
});

// Endpoint odpowiedzialny za utworzenie nowej oferty z samochodem
router.post("/create-car", authMiddleware, async (req, res) => {
  // Pobieramy wszystkie dane z ciała zapytania
  const {
    make,
    model,
    capacity,
    year,
    color,
    bodyType,
    gearboxType,
    mileage,
    fuelType,
    hourlyPrice,
    imageUrl,
    description,
  } = req.body;

  // Sprawdzamy, czy którykolwiek z wymaganych pól jest pusty lub undefined
  if (
    [
      make,
      model,
      capacity,
      year,
      color,
      bodyType,
      gearboxType,
      mileage,
      fuelType,
      hourlyPrice,
      imageUrl,
      description,
    ].some((value) => value === undefined || value === "")
  ) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Nie wszystkie pola zostały uzupełnione przez użytkownika",
      success: false,
    });
  }

  // Definiujemy walidacje dla każdego pola
  const validations = [
    { field: "Marka", validation: validateField(make, makeSchema) },
    { field: "Model", validation: validateField(model, modelSchema) },
    { field: "Pojemność", validation: validateField(capacity, capacitySchema) },
    { field: "Rok produkcji", validation: validateField(year, yearSchema) },
    { field: "Kolor", validation: validateField(color, colorSchema) },
    {
      field: "Typ nadwozia",
      validation: validateField(bodyType, bodyTypeSchema),
    },
    {
      field: "Skrzynia biegów",
      validation: validateField(gearboxType, gearboxTypeSchema),
    },
    { field: "Przebieg", validation: validateField(mileage, mileageSchema) },
    {
      field: "Rodzaj paliwa",
      validation: validateField(fuelType, fuelTypeSchema),
    },
    {
      field: "Cena za godzinę",
      validation: validateField(hourlyPrice, hourlyPriceSchema),
    },
    {
      field: "Link do obrazu",
      validation: validateField(imageUrl, imageUrlSchema),
    },
    {
      field: "Opis",
      validation: validateField(description, descriptionSchema),
    },
  ];

  // Jeśli jakiekolwiek pole nie spełnia warunków walidacji, zwracamy odpowiednią odpowiedź
  for (const { field, validation } of validations) {
    if (!validation.isValid) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: `${field} nie spełnia warunków walidacji`,
        errors: validation.errors,
        success: false,
      });
    }
  }

  // Dodanie pola z informacją przez kogo została utworzona oferta oraz przez kogo została zmodyfikowana (utworzenie zasobu to też modyfikacja - jest to pierwsza modyfikacja)
  req.body.createdBy = req.user.userId;

  // Pole 'modifiedBy' składać się będzie z id modyfikacji, id użytkownika modyfikującego zasób i daty modyfikacji
  req.body.modifiedBy = { userId: req.user.userId, modifiedAt: new Date() };

  // Tworzymy nowy rekord (nową ofertę samochodu)
  const newCar = new Car(req.body);

  // Zapisanie rekordu w bazie
  await newCar.save();

  // W przypadku znalezienia utworzenia rekordu w bazie, wynik jest zwracany w odpowiedzi
  res.status(StatusCodes.OK).json({
    message: "Dodawanie nowej oferty zakończyło się powodzeniem",
    data: newCar,
    success: true,
  });
});

// Endpoint odpowiedzialny za modyfikację istniejącej już oferty z samochodem
router.patch("/update-car/:carId", authMiddleware, async (req, res) => {
  // Pobranie ID samochodu z parametru ścieżki
  const carId = req.params.carId;

  // Wyszukiwanie samochodu po numerze id
  const foundCar = await Car.findById(carId);

  // Jeśli samochód nie został znaleziony w bazie danych, to zwracany jest odpowiedni komunikat
  if (!foundCar) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Nie znaleziono samochodu o takim numerze id",
      success: false,
    });
  }

  // Pobieramy wszystkie dane z ciała zapytania
  const {
    make,
    model,
    capacity,
    year,
    color,
    bodyType,
    gearboxType,
    mileage,
    fuelType,
    hourlyPrice,
    imageUrl,
    description,
  } = req.body;

  // Sprawdzamy, czy którykolwiek z wymaganych pól jest pusty lub undefined
  if (
    [
      make,
      model,
      capacity,
      year,
      color,
      bodyType,
      gearboxType,
      mileage,
      fuelType,
      hourlyPrice,
      imageUrl,
      description,
    ].some((value) => value === undefined || value === "")
  ) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Nie wszystkie pola zostały uzupełnione przez użytkownika",
      success: false,
    });
  }

  // Definiujemy walidacje dla każdego pola
  const validations = [
    { field: "Marka", validation: validateField(make, makeSchema) },
    { field: "Model", validation: validateField(model, modelSchema) },
    { field: "Pojemność", validation: validateField(capacity, capacitySchema) },
    { field: "Rok produkcji", validation: validateField(year, yearSchema) },
    { field: "Kolor", validation: validateField(color, colorSchema) },
    {
      field: "Typ nadwozia",
      validation: validateField(bodyType, bodyTypeSchema),
    },
    {
      field: "Skrzynia biegów",
      validation: validateField(gearboxType, gearboxTypeSchema),
    },
    { field: "Przebieg", validation: validateField(mileage, mileageSchema) },
    {
      field: "Rodzaj paliwa",
      validation: validateField(fuelType, fuelTypeSchema),
    },
    {
      field: "Cena za godzinę",
      validation: validateField(hourlyPrice, hourlyPriceSchema),
    },
    {
      field: "Link do obrazu",
      validation: validateField(imageUrl, imageUrlSchema),
    },
    {
      field: "Opis",
      validation: validateField(description, descriptionSchema),
    },
  ];

  // Jeśli jakiekolwiek pole nie spełnia warunków walidacji, zwracamy odpowiednią odpowiedź
  for (const { field, validation } of validations) {
    if (!validation.isValid) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: `${field} nie spełnia warunków walidacji`,
        errors: validation.errors,
        success: false,
      });
    }
  }

  // Mając numer id samochodu znajdujemy go w bazie i aktualizujemy dokument
  const updatedCar = await Car.findOneAndUpdate({ _id: carId }, req.body, {
    new: true, // zwracamy zaktualizowany zasób
    runValidators: true, // aktywacja zdefiniowanych w schemacie Mongoose walidatorów
  });

  // W przypadku znalezienia utworzenia rekordu w bazie, wynik jest zwracany w odpowiedzi
  res.status(StatusCodes.OK).json({
    message: "Wybrany zasób został zaktualizowany",
    data: updatedCar,
    success: true,
  });
});

// Endpoint odpowiedzialny za dodanie samochodu do listy ulubionych
router.patch("/add-to-favorites/:carId", authMiddleware, async (req, res) => {
  // Pobranie ID samochodu z parametru ścieżki
  const carId = req.params.carId;
  // Pobranie ID użytkownika z ciasteczka
  const userId = req.user.userId;

  // Szukamy w bazie samochodu o podanym numerze id
  const favoriteCar = await Car.findById(carId);

  // Jeśli samochód nie został znaleziony w bazie danych, to zwracany jest odpowiedni komunikat
  if (!favoriteCar) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Nie znaleziono samochodu o takim numerze id",
      success: false,
    });
  }

  // Pobranie użytkownika z bazy danych
  const user = await User.findById(userId);

  // Jeśli użytkownik nie został znaleziony w bazie danych, to zwracany jest odpowiedni komunikat
  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Nie znaleziono użytkownika",
      success: false,
    });
  }

  // Dodanie lub usunięcie ID samochodu z listy ulubionych samochodów użytkownika

  // Na początku pobieramy index samochodu znajdującego się w tablicy
  const carIndex = user.favorites.indexOf(carId);
  let message = undefined;

  // Jeśli w tablicy ulubionych samochodów nie ma zapisanego tego auta (index wynosi -1), to dodajemy je do listy
  if (carIndex === -1) {
    user.favorites.push(carId);
    message = "Samochód został dodany do listy ulubionych";
  } else {
    // W przeciwnym wypadku usuwamy auto z listy
    user.favorites.splice(carIndex, 1);
    message = "Samochód został usunięty z listy ulubionych";
  }

  // Zapisanie zmian w bazie danych
  await user.save();

  // W przypadku dodania lub usunięcia elementu z listy ulubionych, wynik operacji jest zwracany w odpowiedzi
  res.status(StatusCodes.OK).json({
    message: message,
    success: true,
    favoriteCars: user.favorites,
  });
});

// Endpoint odpowiedzialny za zwrócenie listy ulubionych bieżącego użytkownika
router.get("/get-favorites", authMiddleware, async (req, res) => {
  // Pobranie userId z ciasteczek
  const userId = req.user.userId;

  // Pobranie użytkownika z bazy danych
  const user = await User.findById(userId);

  // Jeśli użytkownik nie został znaleziony w bazie danych, to zwracany jest odpowiedni komunikat
  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Nie znaleziono użytkownika",
      success: false,
    });
  }

  // Treść komunikatu dodawanego do odpowiedzi serwera jest różna w zależności od tego czy cokolwiek znajduje się na liście ulubionych
  let message =
    Array.isArray(user.favorites) && user.favorites.length
      ? "Lista ulubionych została zwrócona"
      : "Lista ulubionych jest pusta";

  // W odpowiedzi zwracamy listę ulubionych; komunikat różni się w zależności od tego, czy lista jest pusta czy znajduje się w niej przynajmniej jeden element
  res.status(StatusCodes.OK).json({
    message: message,
    success: true,
    favoriteCars: user.favorites,
  });
});

// Endpoint odpowiedzialny za usunięcie wybranego pojazdu z bazy danych
router.delete("/delete-car/:carId", authMiddleware, async (req, res) => {
  // Pobranie ID samochodu z parametru ścieżki
  const carId = req.params.carId;

  // Wyszukiwanie samochodu po numerze id
  const deletedCar = await Car.findOneAndDelete({ _id: carId });

  // Jeśli samochód nie został znaleziony w bazie danych, to zwracany jest odpowiedni komunikat
  if (!deletedCar) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Nie znaleziono samochodu o takim numerze id",
      success: false,
    });
  }

  // W przypadku pomyślnego usunięcia zasobu z bazy danych, wyświetlamy następujący komunikat
  res.status(StatusCodes.OK).json({
    message: "Wybrany zasób został usunięty z bazy danych",
    data: deletedCar,
    success: true,
  });
});

// Endpoint odpowiedzialny za przewidywanie należenia konkretnej obserwacji do danego klastra
router.post("/predict-cluster", authMiddleware, async (req, res) => {
  // Tworzymy URL, aby dostać się do ścieżki odpowiadającej za przewidywanie modelu
  const URL = process.env.FLASK_API_URL + "/predict";

  // Wysyłamy żądanie do serwera obsługującego model rekomendacji; wynik zapisujemy do zmiennej 'response'
  const response = await axios.post(URL, req.body);

  // W postaci pliku jsonowego przedstawiona zostanie odpowiedź serwera
  res.json(response.data);
});

// Endpoint służący do pobrania kolekcji samochodów na podstawie preferencji użytkownika (na podstawie kolumny 'cluster')
router.get(
  "/get-cars-by-cluster/:clusterId",
  authMiddleware,
  async (req, res) => {
    // Pobranie ID klastra do którego został przypisany samochód z parametru ścieżki
    const clusterId = req.params.clusterId;

    // Odpytujemy naszą bazę danych w poszukiwaniu po odpowiednim id klastra
    const cars = await Car.find({ cluster: clusterId });

    // W przypadku, gdy w bazie nie ma żadnego rekordu zwracamy informacje o braku zasobów
    if (!cars) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Nie znaleziono zasobu", success: false });
    }

    // W przypadku znalezienia rekordów w bazie, wynik jest zwracany w odpowiedzi
    res.status(StatusCodes.OK).json({
      message: "Zwrócono listę samochodów",
      data: cars,
      success: true,
    });
  }
);

export default router;
