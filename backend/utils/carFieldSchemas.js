import Joi from "joi";

// Definiujemy schemat według którego ma przebiegać walidacja marki samochodu
const makeSchema = Joi.string().min(2).max(50).required().messages({
  "string.base": "Marka musi być tekstem.",
  "string.empty": "Marka nie może być pusta.",
  "string.min": "Marka musi mieć co najmniej 2 znaki.",
  "string.max": "Marka nie może przekraczać 50 znaków.",
  "any.required": "Marka jest wymagana.",
});

// Definiujemy schemat według którego ma przebiegać walidacja modelu samochodu
const modelSchema = Joi.string().min(1).max(50).required().messages({
  "string.base": "Model musi być tekstem.",
  "string.empty": "Model nie może być pusty.",
  "string.min": "Model musi mieć co najmniej 1 znak.",
  "string.max": "Model nie może przekraczać 50 znaków.",
  "any.required": "Model jest wymagany.",
});

// Definiujemy schemat według którego ma przebiegać walidacja pojemności auta
const capacitySchema = Joi.number()
  .integer()
  .min(1)
  .max(9)
  .required()
  .messages({
    "number.base": "Pojemność musi być liczbą.",
    "number.integer": "Pojemność musi być liczbą całkowitą.",
    "number.min": "Pojemność musi wynosić co najmniej 1.",
    "number.max": "Pojemność nie może przekraczać 9.",
    "any.required": "Pojemność jest wymagana.",
  });

// Definiujemy schemat według którego ma przebiegać walidacja roku produkcji samochodu
const yearSchema = Joi.number()
  .integer()
  .min(1990)
  .max(new Date().getFullYear())
  .required()
  .messages({
    "number.base": "Rok musi być liczbą.",
    "number.integer": "Rok musi być liczbą całkowitą.",
    "number.min": "Rok nie może być wcześniejszy niż 1990.",
    "number.max": `Rok nie może być późniejszy niż ${new Date().getFullYear()}.`,
    "any.required": "Rok jest wymagany.",
  });

// Definiujemy schemat według którego ma przebiegać walidacja koloru karoserii auta
const colorSchema = Joi.string().min(3).max(30).required().messages({
  "string.base": "Kolor musi być tekstem.",
  "string.empty": "Kolor nie może być pusty.",
  "string.min": "Kolor musi mieć co najmniej 3 znaki.",
  "string.max": "Kolor nie może przekraczać 30 znaków.",
  "any.required": "Kolor jest wymagany.",
});

// Definiujemy schemat według którego ma przebiegać walidacja karoserii auta
const bodyTypeSchema = Joi.string()
  .valid(
    "Sedan",
    "Hatchback",
    "Crossover",
    "SUV",
    "Coupe",
    "Convertible",
    "Wagon",
    "Pickup",
    "Van"
  )
  .required()
  .messages({
    "any.only":
      "Typ nadwozia musi być jednym z: Sedan, Hatchback, Crossover, SUV, Coupe, Convertible, Wagon, Pickup, Van",
    "any.required": "Typ nadwozia jest wymagany.",
  });

// Definiujemy schemat według którego ma przebiegać walidacja rodzaju skrzyni biegów auta
const gearboxTypeSchema = Joi.string()
  .valid("Manualna", "Automatyczna")
  .required()
  .messages({
    "any.only": "Skrzynia biegów musi być 'Manualna' lub 'Automatyczna'.",
    "any.required": "Skrzynia biegów jest wymagana.",
  });

// Definiujemy schemat według którego ma przebiegać walidacja przebiegu auta
const mileageSchema = Joi.number().integer().min(1).required().messages({
  "number.base": "Przebieg musi być liczbą.",
  "number.integer": "Przebieg musi być liczbą całkowitą.",
  "number.min": "Przebieg nie może być ujemny.",
  "any.required": "Przebieg jest wymagany.",
});

// Definiujemy schemat według którego ma przebiegać walidacja rodzaju paliwa
const fuelTypeSchema = Joi.string()
  .valid("Benzyna", "Diesel", "Elektryk", "Hybryda", "Gaz")
  .required()
  .messages({
    "any.only":
      "Rodzaj paliwa musi być jednym z: Benzyna, Diesel, Elektryk, Hybryda, Gaz.",
    "any.required": "Rodzaj paliwa jest wymagany.",
  });

// Definiujemy schemat według którego ma przebiegać walidacja stawki godzinowej za wynajem auta
const hourlyPriceSchema = Joi.number().precision(2).min(1).required().messages({
  "number.base": "Cena musi być liczbą.",
  "number.min": "Cena musi wynosić co najmniej 1.",
  "number.precision": "Cena może mieć maksymalnie 2 miejsca po przecinku.",
  "any.required": "Cena jest wymagana.",
});

// Definiujemy schemat według którego ma przebiegać walidacja adresów URL zawierających zdjęcia samochodu
const imageUrlSchema = Joi.string().uri().required().messages({
  "string.base": "URL obrazu musi być tekstem.",
  "string.uri": "URL obrazu musi być poprawnym adresem URL.",
  "string.empty": "URL obrazu nie może być pusty.",
  "any.required": "URL obrazu jest wymagany.",
});

// Definiujemy schemat według którego ma przebiegać walidacja opisu oferty samochodu
const descriptionSchema = Joi.string().max(1500).allow("").messages({
  "string.base": "Opis musi być tekstem.",
  "string.max": "Opis nie może przekraczać 1500 znaków.",
});

export {
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
  descriptionSchema
};
