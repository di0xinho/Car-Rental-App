import Joi from "joi";

// Definiujemy schemat według którego ma przebiegać walidacja hasła
const passwordSchema = Joi.string()
    .min(8)
    .max(64)
    .pattern(/[A-Z]/, "Jedna wielka litera")
    .pattern(/[a-z]/, "Jedna mała litera")
    .pattern(/[0-9]/, "Jedna cyfra")
    .pattern(/[^a-zA-Z0-9]/, "Jeden znak specjalny")
    .required();

// Metoda sprawdzająca, czy podane hasło jest zgodne ze sformułowanymi zasadami walidacyjnymi
export const passwordValidator = (password) => {
    const { error } = passwordSchema.validate(password);
    return {
        isValid: !error,
        errors: error ? error.details.map(err => err.message) : []
    };
}
