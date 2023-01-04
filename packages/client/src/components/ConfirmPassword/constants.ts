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
    message: 'Пароль не соответствует требованиям',
    type: 'password',
    placeholder: 'Новый пароль',
    test: /^(?=.*\d)(?=.*[A-ZА-Я]).{8,40}$/,
  },
  {
    name: 'confirmPassword',
    label: 'Повторите пароль',
    message: 'Пароль не соответствует требованиям',
    type: 'password',
    placeholder: 'Повторите пароль',
    test: /^(?=.*\d)(?=.*[A-ZА-Я]).{8,40}$/,
  },
  {
    name: 'oldPassword',
    label: 'Старый пароль',
    message: 'Пароль не соответствует требованиям',
    type: 'password',
    placeholder: 'Старый пароль',
    test: /^(?=.*\d)(?=.*[A-ZА-Я]).{8,40}$/,
  },
] as const

export type ChangePasswordFormStruct = Record<
  typeof changePasswordInputData[number]['name'],
  string
>
