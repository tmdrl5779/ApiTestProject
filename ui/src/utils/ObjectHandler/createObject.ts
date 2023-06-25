// Object.create 타입 단언 추상화
export function createObject<T>(obj: object | null): any {
  return Object.create(obj) as { [key in keyof T]: any }
}
