declare module 'common-types' {
  export interface Dictionary<T> {
    [key: string]: T
  }

  export interface StringObject {
    [key: string]: string | StringObject | string[]
  }

  export interface PayloadItem {
    included: boolean
    key: string
    value: string
    description: string
  }

  export type EmptyObj = Record<string, never>
}
