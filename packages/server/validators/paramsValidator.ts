import type { Request, Response, NextFunction } from 'express'

export type ParamsValidatorRules = {
  key: string
  validator: (v: string) => boolean // validator must return true if value doesn't pass
  required: boolean
}[]

export function paramsValidator(rules: ParamsValidatorRules = []) {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      const { params } = request
      if (params === undefined) {
        throw new Error('Empty request')
      }
      for (const { key, validator, required } of rules) {
        const value = params[key]
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
