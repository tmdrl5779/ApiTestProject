declare module 'common-types' {
  export interface Dictionary {
    [key: string]: string
  }

  export type EmptyObj = Record<string, never>
}
