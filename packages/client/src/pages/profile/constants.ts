const profileDefaultValues = {
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

type FieldNameType = keyof typeof profileDefaultValues

type InputProps = {
  name: FieldNameType
  label: string
  message: string
  type: string
  placeholder: string
  test: RegExp
}

const profileFormInputs: InputProps[] = [
  {
    name: 'first_name',
    label: 'Имя',
    message: 'Поле заполнено некорректно',
    type: 'text',
    placeholder: 'Имя',
    test: /^([A-Z][A-Za-z-]*$)|([А-Я][А-Яа-я-]*$)/,
  },
  {
    name: 'second_name',
    label: 'Фамилия',
    message: 'Поле заполнено некорректно',
    type: 'text',
    placeholder: 'Фамилия',
    test: /^([A-Z][A-Za-z]*$)|([А-Я][А-Яа-я-]*$)/,
  },
  {
    name: 'display_name',
    label: 'Ник',
    message: 'Поле заполнено некорректно',
    type: 'text',
    placeholder: 'Ник',
    test: /^([A-Za-z]+$)|([А-Яа-я-]+$)/,
  },
  {
    name: 'login',
    label: 'Логин',
    message: 'Логин не соответствует требованиям',
    type: 'text',
    placeholder: 'Логин',
    test: /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/,
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
    message: 'Некорректный телефон',
    type: 'text',
    placeholder: 'Телефон',
    test: /^\+?\d{10,15}$/i,
  },
  {
    name: 'password',
    label: 'Пароль',
    message: 'Пароль не соответствует требованиям',
    type: 'password',
    placeholder: 'Пароль',
    test: /^(?=.*\d)(?=.*[A-ZА-Я]).{8,40}$/,
  },
]

const DEFAULT_USER = {
  id: 0,
  email: 'mail@pochta.ru',
  login: 'IvanIvanov',
  second_name: 'Ivanov',
  first_name: 'Ivan',
  display_name: 'Ivan Ivanov',
  phone: '+7 (909) 967 30 30',
  avatar: '/src/assets/king.png',
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
