// first letter must be uppercase
const cap1st = (v: string) =>
  /^[A-ZА-Я]/.test(v) || 'Первая буква должна быть прописной'

// allow only cyrillic or only latin characters
const latOrCyr = (v: string) =>
  /([A-Z].*[А-Яа-я])|([А-Я].*[A-Za-z])/.test(v)
    ? 'Кириллица или латиница, смешивать нельзя'
    : true

// allow only letters and a hyphen
const noSpecialChars = (v: string) =>
  /(^[A-Za-zА-Яа-я-]*$)/.test(v) || 'Используйте только буквы и дефис'

const minMax = (min: number, max: number) => {
  return (v: string) =>
    new RegExp(`^.{${String(min)},${String(max)}}$`, 'm').test(v) ||
    `Должно быть от ${String(min)} до ${String(max)} знаков`
}

// only latin characters
const noCyr = (v: string) => (/[А-Яа-я]/.test(v) ? 'Только латиница' : true)

// at least one non-digit
const nonDigit = (v: string) =>
  /\D/.test(v) || 'Не может состоять только из цифр'

// space not allowed
const noSpace = (v: string) => (/\s/.test(v) ? 'Пробелы не разрешены' : true)

// only letters, numbers, - and _
const generalLogin = (v: string) =>
  /^[a-zA-ZА-Яа-я0-9_-]+$/.test(v) || 'Только буквы, цифары, - и _'

// only digits
const onlyDigits = (v: string) => /^\+?\d+$/.test(v) || 'Разрешены только цифры'

// at least one digit
const aDigit = (v: string) => /\d/.test(v) || 'Используйте хотя бы одну цифру'

// at least one capital letter
const aCapital = (v: string) =>
  /[A-ZА-Я]/.test(v) || 'Используйте хотя бы одну прописную букву'

export {
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
}
