// Uniwersalna funkcja walidująca dowolny parametr
const validateField = (value, schema) => {
    const { error } = schema.validate(value);
    return {
        isValid: !error,
        errors: error ? error.details.map(err => err.message) : []
    };
};

export default validateField;