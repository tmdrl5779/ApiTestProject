export function getValueByKeys(obj: object, keys: string[]): any {
  let result: any
  try {
    result = obj
    keys.forEach(key => {
      result = result?.[key]
      if (result === undefined) {
        throw new Error()
      }
    })
  } catch (e: unknown) {
    return undefined
  }
  return result
}
