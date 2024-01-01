export const parseStr2Json = (value: string) => {
  try {
    return JSON.parse(value)
  } catch (e) {
    return {}
  }
}
