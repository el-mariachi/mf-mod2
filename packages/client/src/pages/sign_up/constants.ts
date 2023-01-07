import {
  cap1st,
  latOrCyr,
  noSpecialChars,
  minMax,
  noCyr,
  nonDigit,
  noSpace,
  generalLogin,
  onlyDigits,
  aDigit,
  aCapital,
} from '../../utils/validations'

const inputData = [
  {
    name: 'first_name',
    label: 'Имя',
    type: 'text',
    placeholder: 'Имя',
    validate: { cap1st, latOrCyr, noSpecialChars },
  },
  {
    name: 'second_name',
    label: 'Фамилия',
    type: 'text',
    placeholder: 'Фамилия',
    validate: { cap1st, latOrCyr, noSpecialChars },
  },
  {
    name: 'login',
    label: 'Логин',
    type: 'text',
    placeholder: 'Логин',
    validate: { minMax: minMax(3, 20), noCyr, nonDigit, noSpace, generalLogin },
  },
  {
    name: 'email',
    label: 'Email',
    message: 'Некорректный email',
    type: 'email',
    placeholder: 'Email',
    test: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  },
  {
    name: 'phone',
    label: 'Телефон',
    type: 'text',
    placeholder: 'Телефон',
    validate: { minMax: minMax(10, 15), onlyDigits },
  },
  {
    name: 'password',
    label: 'Пароль',
    type: 'password',
    placeholder: 'Пароль',
    validate: { minMax: minMax(8, 40), aDigit, aCapital },
  },
  {
    name: 'confirmPassword',
    label: 'Повторите пароль',
    type: 'password',
    placeholder: 'Повторите пароль',
    validate: { minMax: minMax(8, 40), aDigit, aCapital },
  },
] as const

export type SignUpFormFields = typeof inputData[number]['name']
export type SignUpFormStruct = Record<SignUpFormFields, string>

const defaultValues: SignUpFormStruct = {
  first_name: '',
  second_name: '',
  login: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
}

export { inputData, defaultValues }
