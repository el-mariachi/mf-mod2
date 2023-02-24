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
/**
 *
 * @param min number Required min value
 * @param max number Optional max value, Infinity if omitted
 * @returns Function that returns number in range
 */

export const createRangeKeeper =
  (min: number, max?: number) => (value: number) =>
    Math.max(min, Math.min(max || Infinity, value))
