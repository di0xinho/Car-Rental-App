import Joi from "joi";
import moment from "moment";

// Definiujemy schemat według którego ma przebiegać walidacja adresu email
const emailSchema = Joi.string().email().required();

// Definiujemy schemat według którego ma przebiegać walidacja nazwy użytkownika
const usernameSchema = Joi.string()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z][a-zA-Z0-9._]*$/, "valid characters")
    .pattern(/^(?!.*[_.]{2})/, "no consecutive dots/underscores")
    .required()
    .messages({
        "string.base": "Nazwa użytkownika musi być tekstem.",
        "string.empty": "Nazwa użytkownika nie może być pusta.",
        "string.min": "Nazwa użytkownika musi mieć co najmniej 3 znaki.",
        "string.max": "Nazwa użytkownika nie może przekraczać 30 znaków.",
        "string.pattern.name": "Nazwa użytkownika zawiera niedozwolone znaki lub układ znaków.",
        "any.required": "Nazwa użytkownika jest wymagana."
    });

// Definiujemy schemat według którego ma przebiegać walidacja hasła
const passwordSchema = Joi.string()
    .min(8)
    .max(64)
    .pattern(/[A-Z]/, "Jedna wielka litera")
    .pattern(/[a-z]/, "Jedna mała litera")
    .pattern(/[0-9]/, "Jedna cyfra")
    .pattern(/[^a-zA-Z0-9]/, "Jeden znak specjalny")
    .required();

// Definiujemy schemat według którego ma przebiegać walidacja 6-cyfrowego kodu jednorazowego
const resetCodeSchema = Joi.string()
    .length(6)
    .pattern(/^\d{6}$/)
    .required()
    .messages({
        "string.base": "Kod resetujący musi być ciągiem znaków.",
        "string.empty": "Kod resetujący nie może być pusty.",
        "string.length": "Kod resetujący musi składać się z dokładnie 6 cyfr.",
        "string.pattern.base": "Kod resetujący może zawierać tylko cyfry.",
        "any.required": "Kod resetujący jest wymagany."
    });

// Definiujemy schemat według którego ma przebiegać walidacja imienia
const firstNameSchema = Joi.string()
    .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[-\s][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/)
    .min(2)
    .max(30)
    .required()
    .messages({
        "string.base": "Imię musi być ciągiem znaków.",
        "string.empty": "Imię jest wymagane.",
        "string.min": "Imię musi mieć co najmniej {#limit} znaki.",
        "string.max": "Imię może mieć maksymalnie {#limit} znaków.",
        "string.pattern.base": "Imię może zawierać tylko litery oraz pojedynczy myślnik lub spację.",
    });

// Definiujemy schemat według którego ma przebiegać walidacja nazwiska
const surnameSchema = Joi.string()
    .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[-\s][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/)
    .min(2)
    .max(50)
    .required()
    .messages({
        "string.base": "Nazwisko musi być ciągiem znaków.",
        "string.empty": "Nazwisko jest wymagane.",
        "string.min": "Nazwisko musi mieć co najmniej {#limit} znaki.",
        "string.max": "Nazwisko może mieć maksymalnie {#limit} znaków.",
        "string.pattern.base": "Nazwisko może zawierać tylko litery oraz pojedynczy myślnik lub spację.",
    }); 

// Definiujemy schemat według którego ma przebiegać walidacja numeru telefonu
const phoneNumberSchema = Joi.string()
    .pattern(/^[0-9]{9,15}$/)
    .required()
    .messages({
        "string.base": "Numer telefonu musi być ciągiem cyfr",
        "string.empty": "Numer telefonu jest wymagany",
        "string.pattern.base": "Numer telefonu powinien zawierać tylko cyfry (9-15 znaków)",
    });

// Definiujemy schemat według którego ma przebiegać walidacja płci
const genderSchema = Joi.string()
    .valid("Mężczyzna", "Kobieta", "Inna")
    .required()
    .messages({
        "any.only": "Płeć musi być jedną z wartości: Mężczyzna, Kobieta lub Inna",
        "string.base": "Płeć musi być ciągiem znaków",
        "string.empty": "Płeć jest wymagana",
    });

// Definiujemy schemat według którego ma przebiegać walidacja daty urodzenia
const dateOfBirthSchema = Joi.string()
    .pattern(/^\d{2}-\d{2}-\d{4}$/)
    .custom((value, helpers) => {
        const regex = /^\d{2}-\d{2}-\d{4}$/;
        if (!regex.test(value)) {
            throw new Joi.ValidationError("Data urodzenia musi być w formacie DD-MM-YYYY");
        }
        
        const parsedDate = moment(value, "DD-MM-YYYY", true);
        
        if (!parsedDate.isValid()) {
            throw new Joi.ValidationError("Niepoprawna data urodzenia");
        }
        
        const age = moment().diff(parsedDate, "years");
        if (age < 18) {
            throw new Joi.ValidationError("Musisz mieć co najmniej 13 lat");
        }
        
        return value;
    })
    .required()
    .messages({
        "string.base": "Data urodzenia musi być ciągiem znaków",
        "string.empty": "Data urodzenia jest wymagana",
    });

// Uniwersalna funkcja walidująca dowolny parametr
const validateField = (value, schema) => {
    const { error } = schema.validate(value);
    return {
        isValid: !error,
        errors: error ? error.details.map(err => err.message) : []
    };
};

export { emailSchema, usernameSchema, passwordSchema, resetCodeSchema, firstNameSchema, surnameSchema, dateOfBirthSchema, phoneNumberSchema, genderSchema, validateField };