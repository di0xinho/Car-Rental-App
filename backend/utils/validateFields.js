import Joi from "joi";

// Definiujemy schemat według którego ma przebiegać walidacja adresu email
const emailSchema = Joi.string().email().required();

// Definiujemy schemat według którego ma przebiegać walidacja hasła
const passwordSchema = Joi.string()
    .min(8)
    .max(64)
    .pattern(/[A-Z]/, "Jedna wielka litera")
    .pattern(/[a-z]/, "Jedna mała litera")
    .pattern(/[0-9]/, "Jedna cyfra")
    .pattern(/[^a-zA-Z0-9]/, "Jeden znak specjalny")
    .required();

// Uniwersalna funkcja walidująca dowolny parametr
const validateField = (value, schema) => {
    const { error } = schema.validate(value);
    return {
        isValid: !error,
        errors: error ? error.details.map(err => err.message) : []
    };
};

export { emailSchema, passwordSchema, validateField };