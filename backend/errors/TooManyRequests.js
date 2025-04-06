import { StatusCodes } from 'http-status-codes'
import AppError from './AppError.js'

class TooManyRequestsError extends AppError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.TOO_MANY_REQUESTS
  }
}

export default TooManyRequestsError;