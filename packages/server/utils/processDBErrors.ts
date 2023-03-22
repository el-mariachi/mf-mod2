import { BaseError, ValidationError } from 'sequelize'
import { combineValidationErrors } from '.'

const isValidationError = (error: BaseError): error is ValidationError => {
  return error instanceof ValidationError
}

export const processDBErrors = (error: BaseError) => {
  if (isValidationError(error)) {
    return {
      code: 409,
      message: combineValidationErrors(error),
    }
  }
  return {
    code: 500,
    message: error.message || 'Неизвестная ошибка',
  }
}
