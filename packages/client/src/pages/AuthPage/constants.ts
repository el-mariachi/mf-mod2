const defaultValues = {
  login: '',
  password: '',
}
type FieldNameType = keyof typeof defaultValues

type InputProps = {
  name: FieldNameType
  label: string
  message: string
  type: string
  placeholder: string
  test: RegExp
}

const signInInputData: InputProps[] = [
  {
    name: 'login',
    label: 'Логин',
    message: 'Логин не соответствует требованиям',
    type: 'text',
    placeholder: 'Логин',
    test: /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/,
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

export { defaultValues, signInInputData }

export type AuthFormStruct = Record<
  typeof signInInputData[number]['name'],
  string
>
