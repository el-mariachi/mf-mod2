import type { User } from '../db/models/User'
import type { ValidatorRules } from './validator'

export const createUserValidations: ValidatorRules<User & { theme?: string }> =
  [
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

export const deleteUserValidations: ValidatorRules<User> = [
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
