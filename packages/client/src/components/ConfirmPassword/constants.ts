import { minMax, aDigit, aCapital } from '@utils/validations'

export const PASSWORD_FIELDS: ProfileInputProps[] = [
  {
    name: 'oldPassword',
    type: 'password',
    value: '',
    label: 'Старый пароль',
  },
  {
    name: 'newPassword',
    type: 'password',
    value: '',
    label: 'Новый пароль',
  },
  {
    name: 'newPassword2',
    type: 'password',
    value: '',
    label: 'Повторите новый пароль',
  },
]

export const changePasswordInputData = [
  {
    name: 'newPassword',
    label: 'Новый пароль',
    type: 'password',
    placeholder: 'Новый пароль',
    validate: { minMax: minMax(8, 40), aDigit, aCapital },
  },
  {
    name: 'confirmPassword',
    label: 'Повторите пароль',
    type: 'password',
    placeholder: 'Повторите пароль',
    validate: { minMax: minMax(8, 40), aDigit, aCapital },
  },
  {
    name: 'oldPassword',
    label: 'Старый пароль',
    type: 'password',
    placeholder: 'Старый пароль',
    validate: { minMax: minMax(8, 40), aDigit, aCapital },
  },
] as const

export type ChangePasswordFormFields =
  (typeof changePasswordInputData)[number]['name']

export type ChangePasswordFormStruct = Record<ChangePasswordFormFields, string>
