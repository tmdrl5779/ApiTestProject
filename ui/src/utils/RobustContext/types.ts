import { Context, ReactNode } from 'react'

export interface IRobustContext<T> extends Omit<Context<T>, 'Provider'> {
  Provider: IRobustContextProvider<T>
  origin: Context<T>
}

export type IRobustContextProvider<T> = React.FC<{ children: ReactNode; value: T }>
