import { StatusCodes } from 'http-status-codes'
import AppError from './AppError.js'

class ConflictError extends AppError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.CONFLICT
  }
}

export default ConflictError;