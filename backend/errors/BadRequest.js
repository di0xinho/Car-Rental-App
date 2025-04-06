import { StatusCodes } from 'http-status-codes'
import AppError from './AppError.js'

class BadRequestError extends AppError {
  constructor(message, errors = null) {
    super(message)
    this.statusCode = StatusCodes.BAD_REQUEST
    this.errors = errors || null
  }
}

export default BadRequestError;