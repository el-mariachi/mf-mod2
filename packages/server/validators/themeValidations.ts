import type { Theme } from '../db/models/Theme'
import type { BodyValidatorRules } from './bodyValidator'
import type { ParamsValidatorRules } from './paramsValidator'

export const findThemeValidations: ParamsValidatorRules = [
  {
    key: 'id',
    validator: value => isNaN(Number(value)),
    required: true,
  },
]

export const createThemeValidations: BodyValidatorRules<Theme> = [
  {
    key: 'theme',
    validator: value => typeof value !== 'string',
    required: true,
  },
  {
    key: 'description',
    validator: value => typeof value !== 'string',
    required: false,
  },
]
export const deleteThemeValidations: BodyValidatorRules<Theme> = [
  {
    key: 'id',
    validator: value => typeof value !== 'number',
    required: true,
  },
]
