import { isArrayOrObject, isPlainObject } from '@utils/index'

export function cloneDeep<T>(obj: [] | PlainObject = {}) {
  let cloned: unknown[] | PlainObject

  if (isPlainObject(obj)) {
    cloned = {}
    for (const [prop, value] of Object.entries(obj as PlainObject)) {
      if (isArrayOrObject(value)) {
        cloned[prop] = cloneDeep(value)
      } else cloned[prop] = value
    }
  } else {
    cloned = []

    obj.forEach((value, key) => {
      if (isArrayOrObject(value)) {
        // @ts-ignore
        cloned[key] = cloneDeep(value)
      }
      // @ts-ignore
      else cloned[key] = value
    })
  }
  return cloned as T
}
