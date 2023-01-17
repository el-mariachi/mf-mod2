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
} from '@utils/validations'

const profileFormInputs = [
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
    name: 'display_name',
    label: 'Ник',
    type: 'text',
    placeholder: 'Ник',
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
]

export type ProfileFormFields = typeof profileFormInputs[number]['name']
export type ProfileFormStruct = Record<ProfileFormFields, string>

const profileDefaultValues: ProfileFormStruct = {
  first_name: '',
  second_name: '',
  display_name: '',
  login: '',
  email: '',
  phone: '',
  password: '',
}

const passwordDefaultValues = {
  password: '',
  confirmPassword: '',
}

const DEFAULT_USER = {
  id: 0,
  email: 'mail@pochta.ru',
  login: 'IvanIvanov',
  second_name: 'Ivanov',
  first_name: 'Ivan',
  display_name: 'IvanIvanov',
  phone: '+79099673030',
  avatar: '@images/king.png',
}

const EDIT_CLASS = 'user-profile__form_edit'
const READ_CLASS = 'user-profile__form_read'

export {
  profileFormInputs,
  profileDefaultValues,
  passwordDefaultValues,
  DEFAULT_USER,
  EDIT_CLASS,
  READ_CLASS,
}
