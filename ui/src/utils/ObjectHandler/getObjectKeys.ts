// Object.keys 타입 단언 추상화
export function getObjectKeys<T>(obj: T) {
  return Object.keys(obj) as Array<keyof T>
}
