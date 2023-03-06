import type { Request, Response, NextFunction } from 'express'

export type ValidatorRules<T> = {
  key: keyof T
  validator: (v: T[keyof T]) => boolean // validator must return true if value doesn't pass
  required: boolean
}[]

export function validator<T extends object>(rules: ValidatorRules<T> = []) {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      const { body } = request
      if (body === undefined) {
        throw new Error('Empty request')
      }
      for (const { key, validator, required } of rules) {
        const value = body[key]
        if (value === undefined && required) {
          throw new Error(`Property '${String(key)}' is missing but required`)
        }
        if (value !== undefined && validator(value)) {
          throw new Error(`Property '${String(key)}' didn't pass validation`)
        }
      }
      next()
    } catch (error) {
      const { message } = error as Error
      response.status(400).send({ reason: message })
    }
  }
}
