const defaultValues = {
  first_name: '',
  second_name: '',
  login: '',
  email: '',
  phone: '',
  password: '',
  password2: '',
}

export type FieldName = keyof typeof defaultValues

export type InputData = {
  name: FieldName
  label: string
  message: string
  type: string
  placeholder: string
  test: RegExp
  valid: boolean
}

const inputData: InputData[] = [
  {
    name: 'first_name',
    label: 'Имя',
    message: 'Поле заполнено некорректно',
    type: 'text',
    placeholder: 'Имя',
    test: /^([A-Z][A-Za-z-]*$)|([А-Я][А-Яа-я-]*$)/,
    valid: true,
  },
  {
    name: 'second_name',
    label: 'Фамилия',
    message: 'Поле заполнено некорректно',
    type: 'text',
    placeholder: 'Фамилия',
    test: /^([A-Z][A-Za-z]*$)|([А-Я][А-Яа-я-]*$)/,
    valid: true,
  },
  {
    name: 'login',
    label: 'Логин',
    message: 'Логин не соответствует требованиям',
    type: 'text',
    placeholder: 'Логин',
    test: /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/,
    valid: true,
  },
  {
    name: 'email',
    label: 'Email',
    message: 'Некорректный email',
    type: 'email',
    placeholder: 'Email',
    test: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    valid: true,
  },
  {
    name: 'phone',
    label: 'Телефон',
    message: 'Некорректный телефон',
    type: 'text',
    placeholder: 'Телефон',
    test: /^\+?\d{10,15}$/i,
    valid: true,
  },
  {
    name: 'password',
    label: 'Пароль',
    message: 'Пароль не соответствует требованиям',
    type: 'password',
    placeholder: 'Пароль',
    test: /^(?=.*\d)(?=.*[A-ZА-Я]).{8,40}$/,
    valid: true,
  },
  {
    name: 'password2',
    label: 'Повторите пароль',
    message: 'Пароль не соответствует требованиям',
    type: 'password',
    placeholder: 'Повторите пароль',
    test: /^(?=.*\d)(?=.*[A-ZА-Я]).{8,40}$/,
    valid: true,
  },
]

export { inputData, defaultValues }
