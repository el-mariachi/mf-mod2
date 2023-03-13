import type { ValidationError } from 'sequelize'

export const combineValidationErrors = (error: unknown): string => {
  const err = error as ValidationError
  return err.errors.map(({ message }) => message).join(', ')
}
