const signInInputData = [
  {
    name: 'login',
    label: 'Логин',
    type: 'text',
    placeholder: 'Логин',
  },
  {
    name: 'password',
    label: 'Пароль',
    type: 'password',
    placeholder: 'Пароль',
  },
] as const

export type AuthFormFields = typeof signInInputData[number]['name']
export type AuthFormStruct = Record<AuthFormFields, string>

const defaultValues: AuthFormStruct = {
  login: '',
  password: '',
}

export { defaultValues, signInInputData }
