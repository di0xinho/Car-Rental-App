import { StatusCodes } from 'http-status-codes';

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Wystąpił błąd na serwerze';

  const response = {
    success: false,
    error: message,
  };

  // Dodaj błędy walidacji, jeśli istnieją
  if (err.errors) {
    response.errors = err.errors;
  }

  res.status(statusCode).json(response);
};

export default errorMiddleware;
