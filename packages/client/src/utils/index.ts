export function getFormDataOf<T = PlainObject>(form: HTMLFormElement) {
  return Object.fromEntries(new FormData(form).entries()) as unknown as T
}
export function redirect2(path = '/', except: string[] = []) {
  if (path != location.pathname && !except.includes(location.pathname)) {
    location.replace(path)
  }
}
export const muteRes = () => {
  return
}
export function roundArrValues<T extends unknown[]>(arr: number[]) {
  return arr.map(val => Math.round(val)) as T
}
