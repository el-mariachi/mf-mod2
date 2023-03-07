import type { Theme } from '../db/models/Theme'
import type { ValidatorRules } from './validator'

export const createThemeValidations: ValidatorRules<Theme> = [
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
export const deleteThemeValidations: ValidatorRules<Theme> = [
  {
    key: 'id',
    validator: value => typeof value !== 'number',
    required: true,
  },
]
