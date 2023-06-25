import { Context, useContext } from 'react'
import { IRobustContext } from './types'

export function useRobustContext<T>(context: IRobustContext<T>) {
  const value = useContext(context.origin)
  const contextName = context.origin.displayName || 'context'
  if (value === undefined) {
    throw new Error(`useContext(${contextName}) should be used within <${contextName}.Provider>`)
  }
  return value
}
