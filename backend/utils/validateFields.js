import Joi from "joi";

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


// Uniwersalna funkcja walidująca dowolny parametr
const validateField = (value, schema) => {
    const { error } = schema.validate(value);
    return {
        isValid: !error,
        errors: error ? error.details.map(err => err.message) : []
    };
};

export { emailSchema, usernameSchema, passwordSchema, resetCodeSchema, validateField };