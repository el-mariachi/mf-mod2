function isArray(value: unknown): value is [] {
  return Array.isArray(value)
}
function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value)
}
export function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  )
}
export function isObjectsEqual(a: PlainObject, b: PlainObject) {
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false
  }
  for (const [key, value] of Object.entries(a)) {
    const bValue = b[key]

    if (isArrayOrObject(value) && isArrayOrObject(bValue)) {
      // @ts-ignore
      if (isEqual(value, bValue)) {
        continue
      }
      return false
    }
    if (value !== bValue) {
      return false
    }
  }
  return true
}
export function isArraysEqual(a: unknown[], b: unknown[]) {
  if (a === b) return true
  if (a == null || b == null) return false
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false
  }
  return true
}
