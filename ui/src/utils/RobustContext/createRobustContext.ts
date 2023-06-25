import { IRobustContext } from './types'
import { createContext } from 'react'
import { RobustContextProviderBuilder } from './RobustContextProvider'

export function createRobustContext<IContext>(defaultValue?: IContext) {
  const originContext = createContext(defaultValue as IContext)
  const robustContext: IRobustContext<IContext> = {
    Provider: RobustContextProviderBuilder<IContext>(originContext),
    Consumer: originContext.Consumer,
    set displayName(name: string) {
      originContext.displayName = name
    },
    origin: originContext,
  }
  return robustContext
}
