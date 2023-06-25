import { Context, ReactNode, useMemo } from 'react'
import { getMemoizedObjBuilder } from './getMemoizedObj'
import { IRobustContextProvider } from './types'

export function RobustContextProviderBuilder<IContext extends { [key: string]: any }>(
  context: Context<IContext>
): IRobustContextProvider<IContext> {
  const { getMemoizedObj } = getMemoizedObjBuilder<IContext>()
  return ({ children, value }) => {
    const memoizedValue = getMemoizedObj(value)
    return <context.Provider value={memoizedValue}>{children}</context.Provider>
  }
}
