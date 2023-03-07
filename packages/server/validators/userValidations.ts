import type { Theme } from '../db/models/Theme'
import type { User } from '../db/models/User'
import type { BodyValidatorRules } from './bodyValidator'
import type { ParamsValidatorRules } from './paramsValidator'

export const findUserValidations: ParamsValidatorRules = [
  {
    key: 'id',
    validator: value => isNaN(Number(value)),
    required: true,
  },
]

export const createUserValidations: BodyValidatorRules<
  User & { theme?: string }
> = [
  {
    key: 'yandex_id',
    validator: value => typeof value !== 'number',
    required: true,
  },
  {
    key: 'user_name',
    validator: value => typeof value !== 'string',
    required: true,
  },
  {
    key: 'theme',
    validator: value => typeof value !== 'string',
    required: false,
  },
]

export const deleteUserValidations: BodyValidatorRules<User> = [
  {
    key: 'yandex_id',
    validator: value => typeof value !== 'number',
    required: true,
  },
  {
    key: 'user_name',
    validator: value => typeof value !== 'string',
    required: false,
  },
]

export const setUserThemeValidations: BodyValidatorRules<Theme> = [
  {
    key: 'id',
    validator: value => typeof value !== 'number',
    required: true,
  },
]
