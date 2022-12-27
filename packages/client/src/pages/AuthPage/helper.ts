// TODO use proj sctructure
export type PlainObject<T = unknown> = {
  [key in string]: T
}
export function getFormDataObject(form: HTMLFormElement): PlainObject {
  return Object.fromEntries(new FormData(form).entries())
}
