import { StatusCodes } from 'http-status-codes'
import AppError from './AppError.js'

class UnauthorizedError extends AppError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}

export default UnauthorizedError